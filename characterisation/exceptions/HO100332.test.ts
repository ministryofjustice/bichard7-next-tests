import World from "../../utils/world"
import generateSpiMessage from "../helpers/generateSpiMessage"
import { processPhase1Message } from "../helpers/processMessage"
import type { ResultedCaseMessageParsedXml } from "../types/IncomingMessage"

describe.ifPhase1("HO100332", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.skip("should create an exception when the offenceSequenceNumber doesn't match PNC", async () => {
    const inputMessage = generateSpiMessage({
      offences: [{ offenceSequenceNumber: 0, code: "CJ88144", results: [{ code: 1002 }] }]
    })

    const pncDetails = {
      Session: {
        Case: {
          Defendant: {
            Offence: [{ sequenceNumber: 1, cjsOffenceCode: "CJ88144" }]
          }
        }
      }
    } as unknown as Partial<ResultedCaseMessageParsedXml>

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false,
      pncOverrides: pncDetails,
      pncCaseType: "courtAndPenality"
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100332",
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
