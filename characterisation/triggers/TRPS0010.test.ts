import World from "../../utils/world"
import generatePhase2Message from "../helpers/generatePhase2Message"
import { processPhase2Message } from "../helpers/processMessage"
import MessageType from "../types/MessageType"
import { ResultClass } from "../types/ResultClass"
import { TriggerCode } from "../types/TriggerCode"

describe.ifPhase2("TRPS0010", () => {
  afterAll(async () => {
    await new World().db.closeConnection()
  })

  it.ifNewBichard(
    "creates a TRPS0010 for PncUpdateDataset when no operations and exceptions are generated",
    async () => {
      const inputMessage = generatePhase2Message({
        messageType: MessageType.PNC_UPDATE_DATASET,
        penaltyNoticeCaseReferenceNumber: undefined,
        offences: [
          {
            offenceReasonSequence: true,
            addedByTheCourt: true,
            results: [
              {
                resultClass: ResultClass.JUDGEMENT_WITH_FINAL_RESULT,
                pncAdjudicationExists: false,
                pncDisposalType: 2007
              }
            ]
          }
        ],
        hasCompletedDisarrOperation: true
      })

      const { triggers } = await processPhase2Message(inputMessage)

      expect(triggers).toContainEqual({ code: TriggerCode.TRPS0010, offenceSequenceNumber: 1 })
    }
  )
})
