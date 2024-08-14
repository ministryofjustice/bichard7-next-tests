import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { offenceReasonPath } from "../helpers/errorPaths"
import generatePhase2Message from "../helpers/generatePhase2Message"
import MessageType from "../types/MessageType"

describe.ifPhase2("HO200117", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
    "creates a HO200117 exception when there are more than 10 recordable results",
    async () => {
      const recordableResults = Array.from({ length: 11 }, () => ({
        cjsResultCode: 1015,
        recordableOnPncIndicator: true
      }))

      const inputMessage = generatePhase2Message({
        messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
        offences: [
          {
            results: recordableResults
          }
        ]
      })

      const {
        outputMessage: { Exceptions: exceptions }
      } = await processPhase2Message(inputMessage)

      expect(exceptions).toStrictEqual([
        {
          code: "HO200117",
          path: offenceReasonPath(0)
        }
      ])
    }
  )
})
