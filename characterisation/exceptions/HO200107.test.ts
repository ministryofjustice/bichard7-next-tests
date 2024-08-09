import generateMessage from "../helpers/generateMessage"
import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { offenceResultClassPath } from "../helpers/errorPaths"

jest.setTimeout(30000)

describe.ifPhase2("HO200107", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  describe("when appeal outcome for offence result", () => {
    it.each([
      {
        templateFile: "test-data/HO200107/aho-no-pnc-adjudication-exists.xml.njk",
        messageType: "AHO"
      },
      {
        templateFile: "test-data/HO200107/pud-no-pnc-adjudication-exists.xml.njk",
        messageType: "PncUpdateDataset"
      }
    ])(
      "creates a HO200107 exception for $messageType when PNC adjudication doesn't exist",
      async ({ templateFile }) => {
        const inputMessage = generateMessage(templateFile, {})

        const {
          outputMessage: { Exceptions: exceptions }
        } = await processPhase2Message(inputMessage)

        expect(exceptions).toStrictEqual([
          {
            code: "HO200107",
            path: offenceResultClassPath(0, 0)
          }
        ])
      }
    )

    it.each([
      {
        templateFile: "test-data/HO200107/aho-pnc-adjudication-exists.xml.njk",
        messageType: "AHO"
      },
      {
        templateFile: "test-data/HO200107/pud-pnc-adjudication-exists.xml.njk",
        messageType: "PncUpdateDataset"
      }
    ])(
      "doesn't create a HO200107 exception for $messageType when PNC adjudication exists",
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
