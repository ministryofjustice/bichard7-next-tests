import World from "../../utils/world"
import generatePhase2Message from "../helpers/generatePhase2Message"
import { processPhase2Message } from "../helpers/processMessage"
import MessageType from "../types/MessageType"
import { TriggerCode } from "../types/TriggerCode"

describe.ifPhase2("TRPS0013", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("creates a TRPS0013 for AnnotatedHearingOutcome when no operations and exceptions are generated", async () => {
    const inputMessage = generatePhase2Message({
      messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
      hoTemplate: "NoOperationsAndExceptions",
      offences: [{ offenceReasonSequence: true, results: [{ numberOfOffencesTic: true }] }]
    })

    const { triggers } = await processPhase2Message(inputMessage)

    expect(triggers).toContainEqual({ code: TriggerCode.TRPS0013, offenceSequenceNumber: 1 })
  })

  it.ifNewBichard(
    "creates a TRPS0013 for PncUpdateDataset when no operations and exceptions are generated",
    async () => {
      const inputMessage = generatePhase2Message({
        messageType: MessageType.PNC_UPDATE_DATASET,
        hoTemplate: "NoOperationsAndExceptions",
        offences: [{ offenceReasonSequence: true, results: [{ numberOfOffencesTic: true }] }]
      })

      const { triggers } = await processPhase2Message(inputMessage)

      expect(triggers).toContainEqual({ code: TriggerCode.TRPS0013, offenceSequenceNumber: 1 })
    }
  )

  it("creates a TRPS0013 for AnnotatedHearingOutcome when hearing outcome is aint case", async () => {
    const inputMessage = generatePhase2Message({
      messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
      hoTemplate: "AintCase",
      offences: [{ offenceReasonSequence: true, results: [{ numberOfOffencesTic: true }] }]
    })

    const { triggers } = await processPhase2Message(inputMessage)

    expect(triggers).toContainEqual({ code: TriggerCode.TRPS0013, offenceSequenceNumber: 1 })
  })
})
