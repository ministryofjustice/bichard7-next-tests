import { generateMessage } from "../helpers/generateMessage"
import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { offenceResultClassPath } from "../helpers/errorPaths"

jest.setTimeout(30000)

describe.ifPhase2("HO200101", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("creates a HO200101 exception for AHO when adjournment with judgement", async () => {
    const aho = generateMessage("test-data/HO200101/aho-adjournment-with-judgement.xml.njk", {})

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

  it.each([
    {
      templateFile: "test-data/HO200101/aho-judgement-with-final-result.xml.njk",
      messageType: "AHO",
      result: "adjournment with judgement"
    },
    {
      templateFile: "test-data/HO200101/pud-adjournment-with-judgement.xml.njk",
      messageType: "PncUpdateDataset",
      result: "adjournment with judgement"
    },
    {
      templateFile: "test-data/HO200101/pud-judgement-with-final-result.xml.njk",
      messageType: "PncUpdateDataset",
      result: "judgement with final result"
    }
  ])("doesn't create a HO200101 exception for $messageType when $result", async ({ templateFile }) => {
    const inputMessage = generateMessage(templateFile, {})

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    expect(exceptions).not.toContain({
      code: "HO200101",
      path: offenceResultClassPath(0, 0)
    })
  })
})
