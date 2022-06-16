jest.setTimeout(30000)

import { TriggerCode } from "../types/TriggerCode"
import generateMessage from "../helpers/generateMessage"
import World from "../../steps/world"
import processMessage from "../helpers/processMessage"

const code = TriggerCode.TRPR0015
const resultCode = 4592
const otherTriggerCode = TriggerCode.TRPR0010
const otherResultCode = 4597

describe("TRPR0015", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should generate a case level trigger if another trigger is generated when the case is recordable", async () => {
    
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: resultCode }] }, { results: [{ code: otherResultCode }] }]
    })

    const result = await processMessage(inputMessage)

    expect(result).toStrictEqual({ exceptions: [], triggers: [{ code: otherTriggerCode }, { code }] })
  })

  it("should generate a case level trigger if another trigger is not generated when the case is recordable", async () => {
    
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: resultCode }] }]
    })

    const result = await processMessage(inputMessage)

    expect(result).toStrictEqual({ exceptions: [], triggers: [{ code }] })
  })

  it("should generate a case level trigger if another trigger is generated when the case is not recordable", async () => {
    
    const inputMessage = generateMessage({
      offences: [
        { results: [{ code: resultCode }], recordable: false },
        { results: [{ code: otherResultCode }], recordable: false }
      ]
    })

    const result = await processMessage(inputMessage, { recordable: false })

    expect(result).toStrictEqual({ exceptions: [], triggers: [{ code: otherTriggerCode }, { code }] })
  })

  it("should not generate a case level trigger if another trigger is not generated when the case is not recordable", async () => {
    
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: resultCode }], recordable: false }]
    })

    const result = await processMessage(inputMessage, {
      recordable: false,
      expectTriggers: false,
      expectRecord: false
    })

    expect(result).toStrictEqual({ exceptions: [], triggers: [] })
  })
})
