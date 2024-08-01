jest.setTimeout(30000)

import World from "../../utils/world"
import generateMessage from "../helpers/generateMessage"
import processMessage from "../helpers/processMessage"
import { TriggerCode } from "../types/TriggerCode"
import { SpiVerdict } from "../types/Verdict"

const code = TriggerCode.TRPR0020
const resultCode = 3501
const offenceCode = "CJ03507"

describe("TRPR0020", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should generate a single case trigger for a single offence with the triggers's result code", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          results: [{ code: resultCode }]
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage)

    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
  })

  it("should generate a single case trigger for a single offence with the triggers's offence code", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCode,
          results: [{ code: 3502 }],
          finding: SpiVerdict.Guilty
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage)

    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
  })

  it("should generate triggers for multiple matching offences", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: "MC80515",
          results: [{ code: resultCode }],
          finding: SpiVerdict.Guilty
        },
        {
          code: "MC80515",
          results: [{ code: 3502 }],
          finding: SpiVerdict.Guilty
        },
        {
          code: "MC80515",
          results: [{ code: resultCode }],
          finding: SpiVerdict.Guilty
        },
        {
          code: offenceCode,
          results: [{ code: 3502 }],
          finding: SpiVerdict.Guilty
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage)

    expect(triggers).toStrictEqual([
      { code, offenceSequenceNumber: 1 },
      { code, offenceSequenceNumber: 3 },
      { code, offenceSequenceNumber: 4 }
    ])
  })

  it("should not generate trigger for matching offence code when not guilty", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCode,
          results: [{ code: 1015 }],
          finding: SpiVerdict.NotGuilty
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false })

    expect(triggers).toHaveLength(0)
  })

  it("should not generate trigger for matching offence code when result is not final", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCode,
          results: [{ code: 1085 }],
          finding: SpiVerdict.Guilty
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false })

    expect(triggers).toHaveLength(0)
  })

  it("should generate a trigger when record is not recordable", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          code: offenceCode,
          results: [{ code: 3502 }]
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage, { recordable: false })

    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
  })
})
