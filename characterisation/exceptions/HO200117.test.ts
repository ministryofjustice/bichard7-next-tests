import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { reasonPath } from "../helpers/errorPaths"
import generatePhase2Message from "../helpers/generatePhase2Message"
import MessageType from "../types/MessageType"

jest.setTimeout(30000)

describe.ifPhase2("HO200117", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("creates a HO200117 exception when there are more than 10 recordable results (there are 11)", async () => {
    const recordableResults = Array.from({ length: 11 }, () => ({
      cjsResultCode: 1015,
      recordableOnPncIndicator: true
    }))

    const inputMessage = generatePhase2Message({
      messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
      offences: [
        {
          results: recordableResults
        }
      ]
    })

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)
    
    expect(exceptions).toStrictEqual([
      {
        code: "HO200117",
        path: reasonPath(0)
      }
    ])
  })

  it("does not create a HO200117 exception when there are 10 recordable results", async () => {
    const recordableResults = Array.from({ length: 10 }, () => ({
      cjsResultCode: 1015,
      recordableOnPncIndicator: true
    }))

    const inputMessage = generatePhase2Message({
      messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
      offences: [
        {
          results: recordableResults
        }
      ]
    })

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    expect(exceptions).toHaveLength(0)
  })

  it("does not create a HO200117 exception when there are less than 10 recordable results (there are 9)", async () => {
    const recordableResults = Array.from({ length: 9 }, () => ({
      cjsResultCode: 1015,
      recordableOnPncIndicator: true
    }))

    const inputMessage = generatePhase2Message({
      messageType: MessageType.ANNOTATED_HEARING_OUTCOME,
      offences: [
        {
          results: recordableResults
        }
      ]
    })

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    expect(exceptions).toHaveLength(0)
  })
})


