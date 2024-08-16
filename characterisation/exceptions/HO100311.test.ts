import World from "../../utils/world"
import generateSpiMessage from "../helpers/generateSpiMessage"
import { processPhase1Message } from "../helpers/processMessage"
import type { ResultedCaseMessageParsedXml } from "../types/IncomingMessage"

describe.ifPhase1("HO100311", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.skip("should create an exception if the result code qualifier is invalid", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        { offenceSequenceNumber: 3, code: "CJ88144", results: [{ code: 1015 }] },
        { offenceSequenceNumber: 4, code: "CJ88144", results: [{ code: 1015 }] }
      ]
    })

    const pncDetails = {
      Session: {
        Case: {
          Defendant: {
            Offence: [
              { sequenceNumber: 1, cjsOffenceCode: "CJ88144" },
              { sequenceNumber: 2, cjsOffenceCode: "CJ88144" }
            ]
          }
        }
      }
    } as unknown as Partial<ResultedCaseMessageParsedXml>

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false,
      courtCaseReferenceOverride: "97/1626/008395Q",
      pncOverrides: pncDetails
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100311",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "ResultQualifierVariable",
          0,
          "Code"
        ]
      }
    ])
  })
})
