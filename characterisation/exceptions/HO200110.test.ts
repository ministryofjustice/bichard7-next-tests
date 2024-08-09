import World from "../../utils/world"
import { generateMessage } from "../helpers/generateMessage"
import { processPhase2Message } from "../helpers/processMessage"
import { asnPath } from "../helpers/errorPaths"

jest.setTimeout(30000)

describe.ifPhase2("HO200110", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  describe("when a dummy ASN", () => {
    it.each([
      {
        templateFile: "test-data/HO200110/aho-recordable-on-pnc.xml.njk",
        messageType: "AHO"
      },
      {
        templateFile: "test-data/HO200110/pud-recordable-on-pnc.xml.njk",
        messageType: "PncUpdateDataset"
      }
    ])("creates a HO200110 exception for $messageType when recordable on PNC", async ({ templateFile }) => {
      const inputMessage = generateMessage(templateFile, {})

      const {
        outputMessage: { Exceptions: exceptions }
      } = await processPhase2Message(inputMessage)

      expect(exceptions).toStrictEqual([
        {
          code: "HO200110",
          path: asnPath
        }
      ])
    })

    it("doesn't create a HO200110 exception when not recordable on PNC", async () => {
      const inputMessage = generateMessage("test-data/HO200110/aho-not-recordable-on-pnc.xml.njk", {})

      const {
        outputMessage: { Exceptions: exceptions }
      } = await processPhase2Message(inputMessage, { expectTriggers: false, expectRecord: false })

      expect(exceptions).not.toContainEqual({
        code: "HO200110",
        path: asnPath
      })
    })
  })
})
