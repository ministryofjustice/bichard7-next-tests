import { generateAhoMessage } from "../helpers/generateMessage"
import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"

jest.setTimeout(30000)

describe("HO200101", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("creates an exception when something", async () => {
    const inputMessage = generateAhoMessage({})

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    expect(exceptions).toStrictEqual([
      {
        code: "HO200101",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "ResultClass"
        ]
      }
    ])
  })
})
