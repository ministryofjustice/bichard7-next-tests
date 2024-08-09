jest.setTimeout(30000)

import World from "../../utils/world"
import generateSpiMessage from "../helpers/generateSpiMessage"
import { processPhase1Message } from "../helpers/processMessage"

describe.ifPhase1("HO100249", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.ifNewBichard("should be raised if the courthouse code is invalid", async () => {
    const inputMessage = generateSpiMessage({
      psaCode: 12345,
      offences: [{ results: [{}] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100249",
      path: ["AnnotatedHearingOutcome", "HearingOutcome", "Hearing", "CourtHouseCode"]
    })
  })
})
