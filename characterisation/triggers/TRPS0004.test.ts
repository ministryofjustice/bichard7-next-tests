import World from "../../utils/world"
import generatePhase2Message from "../helpers/generatePhase2Message"
import { processPhase2Message } from "../helpers/processMessage"
import MessageType from "../types/MessageType"
import { TriggerCode } from "../types/TriggerCode"

describe.ifPhase2("TRPS0004", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.ifNewBichard(
    "creates a TRPS0004 for PncUpdateDataset when hearing outcome is AINT case with existing NEWREM operation",
    async () => {
      const inputMessage = generatePhase2Message({
        messageType: MessageType.PNC_UPDATE_DATASET,
        hoTemplate: "AintCase",
        pncOperations: [{ code: "NEWREM" }]
      })

      const { triggers } = await processPhase2Message(inputMessage)

      expect(triggers).toContainEqual({ code: TriggerCode.TRPS0004 })
    }
  )

  it.ifNewBichard(
    "creates a TRPS0004 for PncUpdateDataset when no operations and exceptions are generated but with existing NEWREM operation",
    async () => {
      const inputMessage = generatePhase2Message({
        messageType: MessageType.PNC_UPDATE_DATASET,
        hoTemplate: "NoOperationsAndExceptions",
        pncOperations: [{ code: "NEWREM" }]
      })

      const { triggers } = await processPhase2Message(inputMessage)

      expect(triggers).toContainEqual({ code: TriggerCode.TRPS0004 })
    }
  )
})
