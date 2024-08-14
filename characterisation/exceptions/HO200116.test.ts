import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { asnPath } from "../helpers/errorPaths"
import generatePhase2Message from "../helpers/generatePhase2Message"
import MessageType from "../types/MessageType"

describe.ifPhase2("HO200116", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
    "creates a HO200116 exception when there are more than 100 offences",
    async () => {
      const offences = Array.from({ length: 110 }, () => ({
        results: [{ cjsResultCode: 1015 }]
      }))

      const inputMessage = generatePhase2Message({
        messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
        offences: offences
      })

      const {
        outputMessage: { Exceptions: exceptions }
      } = await processPhase2Message(inputMessage)

      expect(exceptions).toStrictEqual([
        {
          code: "HO200116",
          path: asnPath
        }
      ])
    }
  )

})
