jest.setTimeout(30000)

import World from "../../utils/world"
import { generateSpiMessage } from "../helpers/generateMessage"
import processMessage from "../helpers/processMessage"
import { TriggerCode } from "../types/TriggerCode"

const code = TriggerCode.TRPR0003
const mainResultCode = 1100
const yroResultCode = 1141
const yroSpecificRequirementResultCode = 3104

describe("TRPR0003", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should generate a trigger for a single offence with a main result code", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        {
          results: [{ code: mainResultCode }]
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage)

    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
  })

  it("should generate a trigger for a single offence with a combination of YRO result codes", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        {
          results: [{ code: yroResultCode }, { code: yroSpecificRequirementResultCode }]
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage)

    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
  })

  it("should not generate a trigger for a single offence with only one YRO result code", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        {
          results: [{ code: yroResultCode }]
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false })

    expect(triggers).toHaveLength(0)
  })

  it("should not generate a trigger for a single offence with only one YRO Specific Requirement result code", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        {
          results: [{ code: yroSpecificRequirementResultCode }]
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false })

    expect(triggers).toHaveLength(0)
  })

  it("should generate a trigger for a single offence with main result code and a combination of YRO result codes", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        {
          results: [{ code: mainResultCode }, { code: yroResultCode }, { code: yroSpecificRequirementResultCode }]
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage)

    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
  })

  it("should generate multiple triggers for multiple matching offences", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        {
          results: [{ code: mainResultCode }, { code: yroResultCode }, { code: yroSpecificRequirementResultCode }]
        },
        {
          results: [{ code: yroResultCode }, { code: yroSpecificRequirementResultCode }]
        },
        {
          results: [{ code: 1015 }]
        },
        { results: [{ code: mainResultCode }] }
      ]
    })

    const { triggers } = await processMessage(inputMessage)

    expect(triggers).toStrictEqual([
      { code, offenceSequenceNumber: 1 },
      { code, offenceSequenceNumber: 2 },
      { code, offenceSequenceNumber: 4 }
    ])
  })

  it("should generate a trigger when record is not recordable", async () => {
    const inputMessage = generateSpiMessage({
      offences: [{ results: [{ code: mainResultCode }], recordable: false }]
    })

    const { triggers } = await processMessage(inputMessage, { recordable: false })

    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
  })
})
