jest.setTimeout(20000)

import { TriggerCode } from "../types/TriggerCode"
import TriggerRecordable from "../types/TriggerRecordable"
import generateMessage from "../helpers/generateMessage"
import World from "../../steps/world"
import processMessage from "../helpers/processMessage"

const offenceTests = [
  {
    code: TriggerCode.TRPR0001,
    resultCode: 3070,
    recordable: TriggerRecordable.Both
  },
  {
    code: TriggerCode.TRPR0016,
    resultCode: 3055,
    recordable: TriggerRecordable.Yes
  },
  {
    code: TriggerCode.TRPR0017,
    resultCode: 2007,
    recordable: TriggerRecordable.Yes
  },
  {
    code: TriggerCode.TRPR0021,
    resultCode: 3002,
    recordable: TriggerRecordable.Both
  },
  {
    code: TriggerCode.TRPR0026,
    resultCode: 3075,
    recordable: TriggerRecordable.Both
  }
]

describe("Generic offence triggers", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  describe.each(offenceTests)("Testing generic trigger $code", ({ code, resultCode }) => {
    it("should generate a trigger correctly with single offences", async () => {
      
      const inputMessage = generateMessage({
        offences: [{ results: [{ code: resultCode }] }]
      })

      const { triggers } = await processMessage(inputMessage)

      expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
    })

    it("should generate multiple triggers correctly with multiple offences", async () => {
      
      const inputMessage = generateMessage({
        offences: [
          { results: [{ code: resultCode }] },
          { results: [{ code: 1015 }] },
          { results: [{ code: resultCode }] }
        ]
      })

      const { triggers } = await processMessage(inputMessage)

      expect(triggers).toStrictEqual([
        { code, offenceSequenceNumber: 1 },
        { code, offenceSequenceNumber: 3 }
      ])
    })

    it("should generate a trigger when record is recordable", async () => {
      
      const inputMessage = generateMessage({
        offences: [{ results: [{ code: resultCode }] }]
      })

      const { triggers } = await processMessage(inputMessage)

      expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
    })
  })
})
