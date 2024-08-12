import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { offenceResultClassPath } from "../helpers/errorPaths"
import MessageType from "../types/MessageType"
import generatePhase2Message from "../helpers/generatePhase2Message"
import { ResultClass } from "../types/ResultClass"

describe.ifPhase2("HO200107", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  describe("when appeal outcome for offence result", () => {
    it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
      "creates a HO200107 exception for %s when PNC adjudication doesn't exist",
      async (messageType) => {
        const inputMessage = generatePhase2Message({
          messageType,
          offences: [
            {
              results: [{ resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: false }]
            }
          ]
        })

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

    it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
      "doesn't create a HO200107 exception for %s when PNC adjudication exists",
      async (messageType) => {
        const inputMessage = generatePhase2Message({
          messageType,
          offences: [
            {
              results: [{ resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: true }]
            }
          ]
        })

        const {
          outputMessage: { Exceptions: exceptions }
        } = await processPhase2Message(inputMessage, { expectTriggers: false, expectRecord: false })

        expect(exceptions).toHaveLength(0)
      }
    )
  })
})
