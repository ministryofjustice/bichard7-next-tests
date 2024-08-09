import generateMessage from "../helpers/generateMessage"
import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { offenceResultClassPath } from "../helpers/errorPaths"

jest.setTimeout(30000)

describe.ifPhase2("HO200100", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  describe("when adjournment pre-judgement for offence result", () => {
    it.each([
      {
        templateFile: "test-data/HO200100/aho-pnc-adjudication-exists.xml.njk",
        messageType: "AHO"
      },
      {
        templateFile: "test-data/HO200100/pud-pnc-adjudication-exists.xml.njk",
        messageType: "PncUpdateDataset"
      }
    ])("creates a HO200100 exception for $messageType when PNC adjudication exists", async ({ templateFile }) => {
      const inputMessage = generateMessage(templateFile, {})

      const {
        outputMessage: { Exceptions: exceptions }
      } = await processPhase2Message(inputMessage)

      expect(exceptions).toStrictEqual([
        {
          code: "HO200100",
          path: offenceResultClassPath(0, 0)
        }
      ])
    })

    it.each([
      {
        templateFile: "test-data/HO200100/aho-no-pnc-adjudication-exists.xml.njk",
        messageType: "AHO"
      },
      {
        templateFile: "test-data/HO200100/pud-no-pnc-adjudication-exists.xml.njk",
        messageType: "PncUpdateDataset"
      }
    ])(
      "doesn't create a HO200100 exception for $messageType when PNC adjudication doesn't exist",
      async ({ templateFile }) => {
        const inputMessage = generateMessage(templateFile, {})

        const {
          outputMessage: { Exceptions: exceptions }
        } = await processPhase2Message(inputMessage, { expectTriggers: false, expectRecord: false })

        expect(exceptions).toHaveLength(0)
      }
    )
  })
})
