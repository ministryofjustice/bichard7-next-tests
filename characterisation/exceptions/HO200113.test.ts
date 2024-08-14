import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { asnPath } from "../helpers/errorPaths"
import generatePhase2Message from "../helpers/generatePhase2Message"
import MessageType from "../types/MessageType"
import { ResultClass } from "../types/ResultClass"

describe.ifPhase2("HO200113", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
    "creates a HO200113 exception when NEWREM exists, there are no remand CCRs, and SENDEF exists",
    async () => {
      const inputMessage = generatePhase2Message({
        messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
        offences: [
          {
            recordableOnPncIndicator: true,
            results: [
              { cjsResultCode: 1015 },
              { cjsResultCode: 1015, resultClass: ResultClass.SENTENCE, pncAdjudicationExists: true }
            ],
            addedByTheCourt: true
          }
        ]
      })

      const {
        outputMessage: { Exceptions: exceptions }
      } = await processPhase2Message(inputMessage)

      console.log((await processPhase2Message(inputMessage)).outputMessage)
      expect(exceptions).toStrictEqual([
        {
          code: "HO200113",
          path: asnPath
        }
      ])
    }
  )
})
