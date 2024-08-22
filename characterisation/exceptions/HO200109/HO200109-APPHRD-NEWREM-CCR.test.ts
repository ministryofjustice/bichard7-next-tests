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

  describe("when the input message generates an APPHRD and NEWREM operation with a remand court case reference", () => {
    describe("with results with appeal outcome and adjournment as well as court case reference", () => {
      it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
        "creates a HO200109 exception for %s",
        async (messageType) => {
          const inputMessage = generatePhase2Message({
            messageType,
            offences: [
              {
                results: [
                  { resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: true },
                  { resultClass: ResultClass.ADJOURNMENT }
                ],
                courtCaseReferenceNumber: true
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

    describe("with results with appeal outcome and adjournment with judgement as well as court case reference", () => {
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
                ],
                courtCaseReferenceNumber: true
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

    describe("with results with appeal outcome and adjournment with post-judgement as well court case reference", () => {
      it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
        "creates a HO200109 exception for %s",
        async (messageType) => {
          const inputMessage = generatePhase2Message({
            messageType,
            offences: [
              {
                results: [
                  { resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: true },
                  { resultClass: ResultClass.ADJOURNMENT_POST_JUDGEMENT, pncAdjudicationExists: true }
                ],
                courtCaseReferenceNumber: true
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

    describe("with results with appeal outcome and adjournment with pre-judgement as well as court case reference", () => {
      it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
        "creates a HO200109 exception for %s",
        async (messageType) => {
          const inputMessage = generatePhase2Message({
            messageType,
            offences: [
              {
                results: [
                  { resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: true },
                  { resultClass: ResultClass.ADJOURNMENT_PRE_JUDGEMENT, pncAdjudicationExists: false }
                ],
                courtCaseReferenceNumber: true
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
