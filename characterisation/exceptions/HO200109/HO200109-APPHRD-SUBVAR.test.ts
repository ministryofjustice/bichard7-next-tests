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

  describe("when the input message generates an APPHRD and SUBVAR operation", () => {
    describe("with results including appeal outcome and sentence as well as 2007 PNC disposal", () => {
      it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
        "creates a HO200109 exception for %s",
        async (messageType) => {
          const inputMessage = generatePhase2Message({
            messageType,
            penaltyNoticeCaseReference: false,
            offences: [
              {
                results: [
                  { resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: true },
                  { resultClass: ResultClass.SENTENCE, pncAdjudicationExists: true }
                ]
              }
            ],
            pncAdjudication: true,
            pncDisposals: [{ type: 2007 }]
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

    describe("with results including appeal outcome and judgement with final result", () => {
      it(`creates a HO200109 exception for ${MessageType.ANNOTATED_HEARING_OUTCOME} with 2007 PNC disposal`, async () => {
        const inputMessage = generatePhase2Message({
          messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
          penaltyNoticeCaseReference: false,
          offences: [
            {
              results: [
                { resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: true },
                { resultClass: ResultClass.JUDGEMENT_WITH_FINAL_RESULT, pncAdjudicationExists: true }
              ]
            }
          ],
          pncAdjudication: true,
          pncDisposals: [{ type: 2007 }]
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
      })

      it(`creates a HO200109 exception for ${MessageType.PNC_UPDATE_DATASET} without 2007 PNC disposal`, async () => {
        const inputMessage = generatePhase2Message({
          messageType: MessageType.PNC_UPDATE_DATASET,
          penaltyNoticeCaseReference: false,
          offences: [
            {
              results: [
                { resultClass: ResultClass.APPEAL_OUTCOME, pncAdjudicationExists: true },
                { resultClass: ResultClass.JUDGEMENT_WITH_FINAL_RESULT, pncAdjudicationExists: true }
              ]
            }
          ],
          pncAdjudication: true,
          pncDisposals: [{ type: 1000 }]
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
      })
    })
  })
})
