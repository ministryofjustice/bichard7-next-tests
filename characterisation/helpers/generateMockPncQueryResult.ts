import { isEmpty, merge } from "lodash"
import type { OffenceParsedXml, ResultedCaseMessageParsedXml } from "../types/IncomingMessage"
import type { PncOffence, PncQueryResult } from "../types/PncQueryResult"
import parseSpiResult from "./parseSpiResult"

type OffenceDates = {
  startDate: Date
  endDate?: Date
}

type PncDetailsOverride = {
  cjsOffenceCode?: string
  sequenceNumber?: number
  startDate?: Date
}

const extractDates = (offence: OffenceParsedXml, pncDetails?: PncDetailsOverride): OffenceDates => {
  let dates: OffenceDates

  if (pncDetails && pncDetails.startDate) {
    dates = { startDate: pncDetails.startDate }
  } else {
    dates = {
      startDate: new Date(offence.BaseOffenceDetails.OffenceTiming.OffenceStart.OffenceDateStartDate)
    }
    if (offence.BaseOffenceDetails.OffenceTiming.OffenceEnd?.OffenceEndDate) {
      dates.endDate = new Date(offence.BaseOffenceDetails.OffenceTiming.OffenceEnd.OffenceEndDate)
    }
  }

  return dates
}

const handlePncOverrides = (
  pncOverrides: Partial<ResultedCaseMessageParsedXml> = {},
  spi: Partial<ResultedCaseMessageParsedXml>,
  pncAdjudication = false
): PncOffence[] => {
  const spiCase = spi.Session?.Case

  const offences = spiCase?.Defendant.Offence.map(
    (offenceFromXml: OffenceParsedXml, index: number): PncOffence | undefined => {
      let dates, pncDetails, cjsOffenceCode, sequenceNumber

      if (isEmpty(pncOverrides)) {
        dates = extractDates(offenceFromXml)

        cjsOffenceCode = offenceFromXml.BaseOffenceDetails.OffenceCode
        sequenceNumber = offenceFromXml.BaseOffenceDetails.OffenceSequenceNumber
      } else {
        pncDetails = pncOverrides.Session?.Case.Defendant?.Offence[index] as PncDetailsOverride

        if (pncDetails === undefined) {
          return
        }

        dates = extractDates(offenceFromXml, pncDetails)

        cjsOffenceCode = pncDetails.cjsOffenceCode ?? offenceFromXml.BaseOffenceDetails.OffenceCode
        sequenceNumber = pncDetails.sequenceNumber ?? offenceFromXml.BaseOffenceDetails.OffenceSequenceNumber
      }

      return {
        offence: { acpoOffenceCode: "12:15:24:1", cjsOffenceCode, sequenceNumber, ...dates },
        ...(pncAdjudication && {
          adjudication: { verdict: "GUILTY", sentenceDate: new Date("2020-01-02"), offenceTICNumber: 1, plea: "GUILTY" }
        })
      }
    }
  )

  return offences?.filter((offence) => offence !== undefined) ?? []
}

export default (
  xml: string,
  pncOverrides: Partial<ResultedCaseMessageParsedXml> = {},
  pncCaseType = "court",
  pncAdjudication = false,
  courtCaseReferenceOverride = "12/3456/789012Q"
): PncQueryResult => {
  const spi = merge(parseSpiResult(xml).DeliverRequest.Message.ResultedCaseMessage, pncOverrides)

  const spiCase = spi.Session.Case
  const checkName =
    spiCase.Defendant.CourtIndividualDefendant?.PersonDefendant.BasePersonDetails.PersonName.PersonFamilyName.substr(
      0,
      12
    ) ?? "CHECKNAME"
  const prosecutorRef = spiCase.Defendant.ProsecutorReference.slice(-8)

  const offences = handlePncOverrides(pncOverrides, spi, pncAdjudication)

  const courtCase = {
    courtCases: [
      {
        courtCaseReference: courtCaseReferenceOverride,
        offences
      }
    ]
  }
  const penaltyCase = {
    penaltyCases: [
      {
        penaltyCaseReference: "12/3456/789012Q",
        offences
      }
    ]
  }

  let pncCase

  switch (pncCaseType) {
    case "court":
      pncCase = courtCase
      break
    case "penalty":
      pncCase = penaltyCase
      break
    case "courtAndPenality":
      pncCase = merge(courtCase, penaltyCase)
      break
  }

  const result: PncQueryResult = {
    forceStationCode: spiCase.PTIURN.substring(0, 3),
    checkName,
    pncId: `2000/${prosecutorRef}`,
    ...pncCase
  }
  return result
}
