import { generateMessage } from "../helpers/generateMessage"
import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { offenceResultClassPath } from "../helpers/errorPaths"

jest.setTimeout(30000)

describe.ifPhase2("HO200113", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("creates a HO200113 exception when newrem exists, there are no remand CCRs, and comsen exists", async () => {
    const inputMessage = generateMessage("test-data/AnnotatedHearingOutcome-HO200113.xml.njk", {})
    
    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    // console.log((await processPhase2Message(inputMessage)).outputMessage.AnnotatedHearingOutcome.HearingOutcome.Case.HearingDefendant.Offence)
    expect(exceptions).toStrictEqual([
      {
        code: "HO200113",
        path: offenceResultClassPath(0, 0)
      }
    ])
  })
})
