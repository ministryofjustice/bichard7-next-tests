import World from "../../utils/world"
import { offenceResultClassPath } from "../helpers/errorPaths"
import generateMessage from "../helpers/generateMessage"
import { processPhase2Message } from "../helpers/processMessage"
import { ResultClass } from "../types/ResultClass"

jest.setTimeout(30000)

describe.ifPhase2("HO200104", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.each([
    {
      resultClass: ResultClass.JUDGEMENT_WITH_FINAL_RESULT,
      templateFile: "test-data/HO200104/aho-judgement-with-final-result.xml.njk"
    },
    {
      resultClass: ResultClass.SENTENCE,
      templateFile: "test-data/HO200104/aho-sentence.xml.njk"
    }
  ])("creates an exception for an AHO when result class is $resultClass", async ({ templateFile }) => {
    const aho = generateMessage(templateFile, {})

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(aho)

    expect(exceptions).toStrictEqual([
      {
        code: "HO200104",
        path: offenceResultClassPath(0, 0)
      }
    ])
  })

  it.each([
    {
      resultClass: ResultClass.JUDGEMENT_WITH_FINAL_RESULT,
      templateFile: "test-data/HO200104/pud-judgement-with-final-result.xml.njk"
    },
    {
      resultClass: ResultClass.SENTENCE,
      templateFile: "test-data/HO200104/pud-sentence.xml.njk"
    }
  ])(
    "doesn't create an exception for a PncUpdateDataset when result class is $resultClass",
    async ({ templateFile }) => {
      const pncUpdateDataset = generateMessage(templateFile, {})

      const {
        outputMessage: { Exceptions: exceptions }
      } = await processPhase2Message(pncUpdateDataset, { expectTriggers: false, expectRecord: false })

      expect(exceptions).toHaveLength(0)
    }
  )
})
