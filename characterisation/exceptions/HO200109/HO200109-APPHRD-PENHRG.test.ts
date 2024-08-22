import World from "../../../utils/world"
import generatePhase2Message from "../../helpers/generatePhase2Message"
import { processPhase2Message } from "../../helpers/processMessage"
import { asnPath } from "../../helpers/errorPaths"
import MessageType from "../../types/MessageType"
import { ResultClass } from "../../types/ResultClass"

describe.ifPhase2("HO200109", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  describe("when the input message generates an APPHRD and PENHRG operation", () => {
    describe("with results including appeal outcome and sentence as well as penalty notice", () => {
      it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
        "creates a HO200109 exception for %s",
        async (messageType) => {
          const inputMessage = generatePhase2Message({
            messageType,
            penaltyNoticeCaseReference: true,
            offences: [
              {
                results: [
                  { resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: true },
                  { resultClass: ResultClass.SENTENCE, pncAdjudicationExists: true }
                ]
              }
            ]
          })

          const {
            outputMessage: { Exceptions: exceptions }
          } = await processPhase2Message(inputMessage)

          expect(exceptions).toStrictEqual([
            {
              code: "HO200109",
              path: asnPath
            }
          ])
        }
      )
    })

    describe("with results including appeal outcome and judgement with final result as well as penalty notice", () => {
      it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
        "creates a HO200109 exception for %s",
        async (messageType) => {
          const inputMessage = generatePhase2Message({
            messageType,
            penaltyNoticeCaseReference: true,
            offences: [
              {
                results: [
                  { resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: true },
                  { resultClass: ResultClass.JUDGEMENT_WITH_FINAL_RESULT, pncAdjudicationExists: true }
                ]
              }
            ]
          })

          const {
            outputMessage: { Exceptions: exceptions }
          } = await processPhase2Message(inputMessage)

          expect(exceptions).toStrictEqual([
            {
              code: "HO200109",
              path: asnPath
            }
          ])
        }
      )
    })
  })
})
