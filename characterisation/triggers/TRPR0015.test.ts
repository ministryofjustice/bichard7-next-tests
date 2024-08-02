jest.setTimeout(30000)

import World from "../../utils/world"
import { generateSpiMessage } from "../helpers/generateMessage"
import { processPhase1Message } from "../helpers/processMessage"
import { TriggerCode } from "../types/TriggerCode"

const code = TriggerCode.TRPR0015
const resultCode = 4592
const otherTriggerCode = TriggerCode.TRPR0010
const otherResultCode = 4597

describe("TRPR0015", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should generate a case level trigger if another trigger is generated when the case is recordable", async () => {
    const inputMessage = generateSpiMessage({
      offences: [{ results: [{ code: resultCode }] }, { results: [{ code: otherResultCode }] }]
    })

    const {
      triggers,
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage)

    expect(exceptions).toHaveLength(0)
    expect(triggers).toStrictEqual([{ code: otherTriggerCode }, { code }])
  })

  it("should generate a case level trigger if another trigger is not generated when the case is recordable", async () => {
    const inputMessage = generateSpiMessage({
      offences: [{ results: [{ code: resultCode }] }]
    })

    const {
      triggers,
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage)

    expect(exceptions).toHaveLength(0)
    expect(triggers).toStrictEqual([{ code }])
  })

  it("should generate a case level trigger if another trigger is generated when the case is not recordable", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        { results: [{ code: resultCode }], recordable: false },
        { results: [{ code: otherResultCode }], recordable: false }
      ]
    })

    const {
      triggers,
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, { recordable: false })

    expect(exceptions).toHaveLength(0)
    expect(triggers).toStrictEqual([{ code: otherTriggerCode }, { code }])
  })

  it("should not generate a case level trigger if another trigger is not generated when the case is not recordable", async () => {
    const inputMessage = generateSpiMessage({
      offences: [{ results: [{ code: resultCode }], recordable: false }]
    })

    const {
      triggers,
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      recordable: false,
      expectTriggers: false,
      expectRecord: false
    })

    expect(exceptions).toHaveLength(0)
    expect(triggers).toHaveLength(0)
  })
})
