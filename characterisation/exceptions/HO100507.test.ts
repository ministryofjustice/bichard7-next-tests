import { generateSpiMessage } from "../helpers/generateMessage"
import World from "../../utils/world"
import processMessage from "../helpers/processMessage"

jest.setTimeout(30000)

describe("HO100507", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should create an exception when an offence was added in court and it is a penalty case", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        { code: "TH68010", results: [{}], offenceSequenceNumber: 1 },
        { code: "TH68151", results: [{}], offenceSequenceNumber: 2 }
      ]
    })

    const pncMessage = generateSpiMessage({
      offences: [{ code: "TH68010", results: [{}], offenceSequenceNumber: 1 }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false,
      recordable: true,
      pncCaseType: "penalty",
      pncMessage
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100507",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "ArrestSummonsNumber"]
      }
    ])
  })
})
