import World from "../../utils/world"
import generatePhase2Message from "../helpers/generatePhase2Message"
import { processPhase2Message } from "../helpers/processMessage"
import MessageType from "../types/MessageType"
import { TriggerCode } from "../types/TriggerCode"

const code = TriggerCode.TRPS0011

describe.ifPhase2("TRPS0011", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("creates a TRPS0011 for AnnotatedHearingOutcome when no operations and exceptions are generated", async () => {
    const inputMessage = generatePhase2Message({
      messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
      hoTemplate: "NoOperationsAndExceptions"
    })

    const { triggers } = await processPhase2Message(inputMessage, { recordable: false })

    expect(triggers).toContainEqual({ code, offenceSequenceNumber: 3 })
  })

  it.ifNewBichard(
    "creates a TRPS0011 for PncUpdateDataset when no operations and exceptions are generated",
    async () => {
      const inputMessage = generatePhase2Message({
        messageType: MessageType.PNC_UPDATE_DATASET,
        hoTemplate: "NoOperationsAndExceptions"
      })

      const { triggers } = await processPhase2Message(inputMessage, { recordable: false })

      expect(triggers).toContainEqual({ code, offenceSequenceNumber: 3 })
    }
  )

  it("creates a TRPS0011 for AnnotatedHearingOutcome when hearing outcome is aint case", async () => {
    const inputMessage = generatePhase2Message({
      messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
      hoTemplate: "AintCase",
      offences: [
        {},
        {
          addedByTheCourt: true,
          offenceReasonSequence: true,
          results: [{}]
        }
      ]
    })

    const { triggers } = await processPhase2Message(inputMessage, { recordable: false })

    expect(triggers).toContainEqual({ code, offenceSequenceNumber: 3 })
  })
})
