import generateMessage from "../helpers/generateMessage"
import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { offenceResultClassPath } from "../helpers/errorPaths"

describe.ifPhase2("HO200108", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.each([
    {
      templateFile: "test-data/HO200108/aho-adjournment-with-judgement.xml.njk",
      messageType: "AHO",
      result: "adjournment with judgement"
    },
    {
      templateFile: "test-data/HO200108/pud-adjournment-with-judgement.xml.njk",
      messageType: "PncUpdateDataset",
      result: "adjournment with judgement"
    },
    {
      templateFile: "test-data/HO200108/aho-judgement-with-final-result.xml.njk",
      messageType: "AHO",
      result: "judgement with final result"
    },
    {
      templateFile: "test-data/HO200108/pud-judgement-with-final-result.xml.njk",
      messageType: "PncUpdateDataset",
      result: "judgement with final result"
    }
  ])("creates a HO200108 exception for $messageType when $result", async ({ templateFile }) => {
    const inputMessage = generateMessage(templateFile, {})

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    expect(exceptions).toStrictEqual([
      {
        code: "HO200108",
        path: offenceResultClassPath(0, 0)
      }
    ])
  })

  it.each([
    {
      templateFile: "test-data/HO200108/aho-adjournment-with-judgement-not-2060-disposal.xml.njk",
      result: "adjournment with judgement",
      processMessageOptions: { expectRecord: false }
    },
    {
      templateFile: "test-data/HO200108/aho-judgement-with-final-result-recordable-result.xml.njk",
      result: "judgement with final result"
    }
  ])("doesn't create a HO200108 exception when $result", async ({ templateFile, processMessageOptions }) => {
    const inputMessage = generateMessage(templateFile, {})

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage, { expectTriggers: false, ...processMessageOptions })

    expect(exceptions).not.toContainEqual({
      code: "HO200108",
      path: offenceResultClassPath(0, 0)
    })
  })
})
