jest.setTimeout(30000)

import generateMessage from "../helpers/generateMessage"
import World from "../../../../steps/world"
import processMessage from "../helpers/processMessage"

const expectedExceptions = [
  {
    code: "HO100240",
    path: [
      "AnnotatedHearingOutcome",
      "HearingOutcome",
      "Case",
      "HearingDefendant",
      "Offence",
      0,
      "Result",
      0,
      "CJSresultCode"
    ]
  },
  {
    code: "HO100246",
    path: [
      "AnnotatedHearingOutcome",
      "HearingOutcome",
      "Case",
      "HearingDefendant",
      "Offence",
      0,
      "Result",
      0,
      "PNCDisposalType"
    ]
  }
]

describe("HO100240 and HO100246", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should create exceptions if the result code is too low", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 123 }] }]
    })

    // Process the mock message
    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual(expectedExceptions)
  })

  // Masked by XML parsing error
  it.ifNewBichard("should create exceptions if the result code is too high", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 10000 }] }]
    })

    // Process the mock message
    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual(expectedExceptions)
  })
})