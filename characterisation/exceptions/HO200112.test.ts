import World from "../../utils/world"
import generateMessage from "../helpers/generateMessage"
import { processPhase2Message } from "../helpers/processMessage"
import { asnPath } from "../helpers/errorPaths"

describe.ifPhase2("HO200112", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.each([
    {
      templateFile: "test-data/HO200112/aho.xml.njk",
      messageType: "AHO"
    },
    {
      templateFile: "test-data/HO200112/pud.xml.njk",
      messageType: "PncUpdateDataset"
    }
  ])(
    "creates a HO200112 exception for $messageType when result with judgement with final result and sentence",
    async ({ templateFile }) => {
      const inputMessage = generateMessage(templateFile, {})

      const {
        outputMessage: { Exceptions: exceptions }
      } = await processPhase2Message(inputMessage)

      expect(exceptions).toStrictEqual([
        {
          code: "HO200112",
          path: asnPath
        }
      ])
    }
  )
})
