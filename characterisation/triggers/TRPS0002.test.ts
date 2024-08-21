import World from "../../utils/world"
import generatePhase2Message from "../helpers/generatePhase2Message"
import { processPhase2Message } from "../helpers/processMessage"
import MessageType from "../types/MessageType"
import { TriggerCode } from "../types/TriggerCode"

const code = TriggerCode.TRPS0002

describe.ifPhase2("TRPS0002", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.each([MessageType.ANNOTATED_HEARING_OUTCOME, MessageType.PNC_UPDATE_DATASET])(
    "creates a TRPS0002 for %s when no operations and exceptions are generated and result code is 3107",
    async (messageType) => {
      const inputMessage = generatePhase2Message({
        messageType,
        hoTemplate: "NoOperationsAndExceptions",
        offences: [{ results: [{ cjsResultCode: 3107 }] }]
      })

      const { triggers } = await processPhase2Message(inputMessage, { recordable: false })

      expect(triggers).toContainEqual({ code })
    }
  )

  it("creates a TRPS0002 for AnnotatedHearingOutcome when hearing outcome is aint case are generated and result code is 3107", async () => {
    const inputMessage = generatePhase2Message({
      messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
      hoTemplate: "AintCase",
      offences: [{ results: [{ cjsResultCode: 3107 }] }]
    })

    const { triggers } = await processPhase2Message(inputMessage, { recordable: false })

    expect(triggers).toContainEqual({ code })
  })
})
