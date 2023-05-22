jest.setTimeout(20000)

import { TriggerCode } from "../types/TriggerCode"
import TriggerRecordable from "../types/TriggerRecordable"
import generateMessage from "../helpers/generateMessage"
import World from "../../step-definitions/old-utils/world"
import processMessage from "../helpers/processMessage"

const offenceTests = [
  {
    code: TriggerCode.TRPR0005,
    resultCode: 4012,
    recordable: TriggerRecordable.Both
  },
  {
    code: TriggerCode.TRPR0006,
    resultCode: 1002,
    recordable: TriggerRecordable.Both
  },
  {
    code: TriggerCode.TRPR0007,
    resultCode: 2065,
    recordable: TriggerRecordable.Both
  },
  {
    code: TriggerCode.TRPR0012,
    resultCode: 2509,
    recordable: TriggerRecordable.Both
  },
  {
    code: TriggerCode.TRPR0019,
    resultCode: 4017,
    recordable: TriggerRecordable.Both
  },
  {
    code: TriggerCode.TRPR0022,
    resultCode: 4022,
    recordable: TriggerRecordable.Both
  }
]

describe("Generic case triggers", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  describe.each(offenceTests)("Testing generic trigger $code", ({ code, resultCode }) => {
    it("should generate a trigger correctly with single offences", async () => {
      const inputMessage = generateMessage({
        offences: [{ results: [{ code: resultCode }] }]
      })

      const { triggers } = await processMessage(inputMessage)

      expect(triggers).toStrictEqual([{ code }])
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

      expect(triggers).toStrictEqual([{ code }])
    })

    it("should generate a trigger when record is recordable", async () => {
      const inputMessage = generateMessage({
        offences: [{ results: [{ code: resultCode }] }]
      })

      const { triggers } = await processMessage(inputMessage)

      expect(triggers).toStrictEqual([{ code }])
    })
  })
})
