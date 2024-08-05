import { generateMessage } from "../helpers/generateMessage"
import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { offenceResultClassPath } from "../helpers/errorPaths"

jest.setTimeout(30000)

describe.ifPhase2("HO200108", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.each([
    { templateFile: "test-data/AnnotatedHearingOutcome-HO200108.xml.njk", messageType: "AHO" },
    { templateFile: "test-data/PncUpdateDataset-HO200108.xml.njk", messageType: "PncUpdateDataset" }
  ])("creates an exception for $messageType", async ({ templateFile }) => {
    const aho = generateMessage(templateFile, {})

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(aho)

    expect(exceptions).toStrictEqual([
      {
        code: "HO200108",
        path: offenceResultClassPath(0, 0)
      }
    ])
  })
})