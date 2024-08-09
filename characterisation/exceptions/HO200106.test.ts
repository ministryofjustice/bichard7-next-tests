import World from "../../utils/world"
import { offenceResultClassPath } from "../helpers/errorPaths"
import generateMessage from "../helpers/generateMessage"
import { processPhase2Message } from "../helpers/processMessage"

describe.ifPhase2("HO200106", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  describe("when sentence for offence result", () => {
    it.each([
      {
        templateFile: "test-data/HO200106/aho-sentence.xml.njk",
        messageType: "AHO"
      },
      {
        templateFile: "test-data/HO200106/pud-sentence.xml.njk",
        messageType: "PncUpdateDataset"
      }
    ])(
      "creates a HO200106 exception for $messageType when PNC adjudication exists and not added by the court",
      async ({ templateFile }) => {
        const inputMessage = generateMessage(templateFile, {})

        const {
          outputMessage: { Exceptions: exceptions }
        } = await processPhase2Message(inputMessage)

        expect(exceptions).toStrictEqual([
          {
            code: "HO200106",
            path: offenceResultClassPath(0, 0)
          }
        ])
      }
    )

    it.each([
      {
        templateFile: "test-data/HO200106/aho-pnc-adjudication-exists.xml.njk",
        context: "PNC adjudication doesn't exist"
      },
      {
        templateFile: "test-data/HO200106/aho-pnc-adjudication-exists-and-added-by-the-court.xml.njk",
        context: "PNC adjudication exists but added by the court"
      }
    ])("doesn't create a HO200106 exception when $context", async ({ templateFile }) => {
      const inputMessage = generateMessage(templateFile, {})

      const {
        outputMessage: { Exceptions: exceptions }
      } = await processPhase2Message(inputMessage, { expectTriggers: false, expectRecord: true })

      expect(exceptions).not.toContainEqual({
        code: "HO200106",
        path: offenceResultClassPath(0, 0)
      })
    })
  })
})
