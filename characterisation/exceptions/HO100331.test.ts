jest.setTimeout(30000)

import World from "../../utils/world"
import { generateSpiMessage } from "../helpers/generateMessage"
import { processPhase1Message } from "../helpers/processMessage"

describe.ifPhase1("HO100331", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should create an exception when there are more than 100 offences", async () => {
    const inputMessage = generateSpiMessage({
      offences: Array(101).fill({ results: [{}], recordable: true })
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false,
      recordable: true
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100331",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "CourtReference", "MagistratesCourtReference"]
      }
    ])
  })
})
