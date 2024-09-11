import World from "../../../utils/world"
import { asnPath } from "../../helpers/errorPaths"
import generatePhase2Message from "../../helpers/generatePhase2Message"
import { processPhase2Message } from "../../helpers/processMessage"
import MessageType from "../../types/MessageType"
import { ResultClass } from "../../types/ResultClass"

describe.ifPhase2("HO200109", () => {
  afterAll(async () => {
    await new World().db.closeConnection()
  })

  describe("when the input message generates an APPHRD and DISARR operation", () => {
    describe("with results including appeal outcome and adjournment with judgement", () => {
      it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
        "creates a HO200109 exception for %s",
        async (messageType) => {
          const inputMessage = generatePhase2Message({
            messageType,
            offences: [
              {
                results: [
                  { resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: true },
                  { resultClass: ResultClass.ADJOURNMENT_WITH_JUDGEMENT }
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

    describe("with results including appeal outcome and judgement with final result as well as not added by the court", () => {
      it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
        "creates a HO200109 exception for %s",
        async (messageType) => {
          const inputMessage = generatePhase2Message({
            messageType,
            penaltyNoticeCaseReference: false,
            offences: [
              {
                addedByTheCourt: false,
                results: [
                  { resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: true },
                  { resultClass: ResultClass.JUDGEMENT_WITH_FINAL_RESULT, pncAdjudicationExists: false }
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
