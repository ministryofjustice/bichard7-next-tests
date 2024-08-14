import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { asnPath } from "../helpers/errorPaths"
import generatePhase2Message from "../helpers/generatePhase2Message"
import MessageType from "../types/MessageType"

jest.setTimeout(30000)

describe.ifPhase2("HO200116", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("creates a HO200116 exception when there are more than 100 offences (there are 110)", async () => {

    const offences = Array.from({ length: 110 }, () => ({
      results: [{ cjsResultCode: 1015 }]
    }))

    const inputMessage = generatePhase2Message({
      messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
      offences: offences
    })

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    expect(exceptions).toStrictEqual([
      {
        code: "HO200116",
        path: asnPath
      }
    ])
  })

  it("does not create a HO200116 exception when there are 100 offences", async () => {
    const offences = Array.from({ length: 100 }, () => ({
      results: [{ cjsResultCode: 1015 }]
    }))

    const inputMessage = generatePhase2Message({
      messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
      offences: offences
    })

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    expect(exceptions).toHaveLength(0)
  })

  it("does not create a HO200116 exception when there are less than 100 offences (there are 99)", async () => {
    const offences = Array.from({ length: 99 }, () => ({
      results: [{ cjsResultCode: 1015 }]
    }))

    const inputMessage = generatePhase2Message({
      messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
      offences: offences
    })

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    expect(exceptions).toHaveLength(0)
  })
})