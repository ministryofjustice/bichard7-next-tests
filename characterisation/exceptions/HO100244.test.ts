jest.setTimeout(30000)

import World from "../../utils/world"
import generateMessage from "../helpers/generateMessage"
import processMessage from "../helpers/processMessage"

const expectedExceptions = [
  {
    code: "HO100244",
    path: [
      "AnnotatedHearingOutcome",
      "HearingOutcome",
      "Case",
      "HearingDefendant",
      "Offence",
      0,
      "Result",
      0,
      "NumberSpecifiedInResult",
      0
    ]
  }
]

describe("HO100244", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.ifNewBichard("should not be raised if the number in the result is acceptable", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 3008, outcome: { penaltyPoints: 100 } }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toHaveLength(0)
  })

  it.ifNewBichard("should be raised if the number in the result is too large", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 3008, outcome: { penaltyPoints: 10000 } }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual(expectedExceptions)
  })

  it.ifNewBichard("should be raised if the number in the result is too small", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 3008, outcome: { penaltyPoints: 0.1 } }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual(expectedExceptions)
  })
})
