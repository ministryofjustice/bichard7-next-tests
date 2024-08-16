import World from "../../utils/world"
import generateSpiMessage from "../helpers/generateSpiMessage"
import { processPhase1Message } from "../helpers/processMessage"
import type { ResultedCaseMessageParsedXml } from "../types/IncomingMessage"

describe.ifPhase1("HO100304", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should create an exception can't match the court offences to the PNC offences", async () => {
    const inputMessage = generateSpiMessage({
      offences: [{ offenceSequenceNumber: 1, code: "CJ88144", results: [{ code: 1015 }] }]
    })

    const pncDetails = {
      Session: {
        Case: {
          Defendant: {
            Offence: [
              { sequenceNumber: 1, cjsOffenceCode: "CJ88144", startDate: new Date("2024/02/15") },
              { sequenceNumber: 2, cjsOffenceCode: "CJ88144", startDate: new Date("2024/02/15") }
            ]
          }
        }
      }
    } as unknown as Partial<ResultedCaseMessageParsedXml>

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false,
      pncOverrides: pncDetails
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100304",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "ArrestSummonsNumber"]
      }
    ])
  })
})
