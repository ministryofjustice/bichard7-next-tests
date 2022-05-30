jest.setTimeout(30000)

import generateMessage from "../helpers/generateMessage"
import World from "../../steps/world"
import processMessage from "../helpers/processMessage"

describe("HO100206", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should be raised if the ASN is in an incorrect format", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      ASN: "ABCDEFG1234567Q",
      offences: [{ results: [{}] }]
    })

    // Process the mock message
    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100206",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "ArrestSummonsNumber"]
      }
    ])
  })

  it("should be raised if the ASN has an incorrect check character", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      ASN: "1101ZD0100000448754Z",
      offences: [{ results: [{}] }]
    })

    // Process the mock message
    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100206",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "ArrestSummonsNumber"]
      }
    ])
  })
})
