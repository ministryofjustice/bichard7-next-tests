import World from "../../utils/world"
import generateSpiMessage from "../helpers/generateSpiMessage"
import { processPhase1Message } from "../helpers/processMessage"
import type { ResultedCaseMessageParsedXml } from "../types/IncomingMessage"

describe.ifPhase1("HO100320", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.skip("should create an exception if the result code qualifier is invalid", async () => {
    const inputMessage = generateSpiMessage({
      offences: [{ offenceSequenceNumber: 1, code: "CJ88144", results: [{ code: 1115 }] }]
    })

    const pncDetails = {
      Session: {
        Case: {
          Defendant: {
            Offence: [{ sequenceNumber: 1, cjsOffenceCode: "CJ88144", startDate: new Date("01/08/2023") }]
          }
        }
      }
    } as unknown as Partial<ResultedCaseMessageParsedXml>

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false,
      // courtCaseReferenceOverride: undefined,
      pncOverrides: pncDetails
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100320",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "CriminalProsecutionReference",
          "OffenceReasonSequence"
        ]
      }
    ])
  })
})
