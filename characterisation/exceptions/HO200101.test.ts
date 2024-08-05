import { generateMessage } from "../helpers/generateMessage"
import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { offenceResultClassPath } from "../helpers/errorPaths"

jest.setTimeout(30000)

describe.ifPhase2("HO200101", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("creates an exception for an AHO", async () => {
    const aho = generateMessage("test-data/AnnotatedHearingOutcome-HO200101.xml.njk", {})

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(aho)

    expect(exceptions).toStrictEqual([
      {
        code: "HO200101",
        path: offenceResultClassPath(0, 0)
      }
    ])
  })

  it("doesn't create an exception for a PncUpdateDataset", async () => {
    const pncUpdateDataset = generateMessage("test-data/PncUpdateDataset-HO200101.xml.njk", {})

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(pncUpdateDataset)

    expect(exceptions).toHaveLength(0)
  })
})
