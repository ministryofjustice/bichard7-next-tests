jest.setTimeout(30000)

import { TriggerCode } from "../types/TriggerCode"
import { SpiVerdict } from "../types/Verdict"
import generateMessage from "../helpers/generateMessage"
import World from "../../../../steps/world"
import processMessage from "../helpers/processMessage"

const code = TriggerCode.TRPR0004
const matchingResultCode = 3052
const matchingOffenceCode = "SX56001"

describe("TRPR0004", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should generate a trigger for a single offence with a main result code", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        {
          results: [{ code: matchingResultCode }]
        }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage)

    // Check the right triggers are generated
    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
  })

  it("should generate a trigger for a single guilty offence with a matching offence code", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        {
          code: matchingOffenceCode,
          finding: SpiVerdict.Guilty,
          results: [{ code: matchingResultCode }]
        }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage)

    // Check the right triggers are generated
    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
  })

  it("should generate a trigger for a single offence with matching result text", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        {
          results: [{ code: 1015, text: "Sex Offences Act" }]
        },
        {
          results: [{ code: 1015, text: "Sexual Offender" }]
        }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage)

    // Check the right triggers are generated
    expect(triggers).toStrictEqual([
      { code, offenceSequenceNumber: 1 },
      { code, offenceSequenceNumber: 2 }
    ])
  })

  it("should not generate a trigger for a single non-guilty offence with matching offence code", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        {
          code: matchingOffenceCode,
          finding: SpiVerdict.NotGuilty,
          results: [{ code: 1015 }]
        }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false })

    // Check the right triggers are generated
    expect(triggers).toHaveLength(0)
  })

  it("should not generate a trigger for a single guilty offence with non-matching offence code", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        {
          finding: SpiVerdict.NotGuilty,
          results: [{ code: 1015 }]
        }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false })

    // Check the right triggers are generated
    expect(triggers).toHaveLength(0)
  })

  it("should generate multiple triggers for multiple matching offences", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        { results: [{ code: matchingResultCode }] },
        { results: [{ code: 1015 }] },
        { results: [{ code: matchingResultCode }] }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage)

    // Check the right triggers are generated
    expect(triggers).toStrictEqual([
      { code, offenceSequenceNumber: 1 },
      { code, offenceSequenceNumber: 3 }
    ])
  })

  it("should generate a trigger when record is not recordable", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: matchingResultCode }], recordable: false }]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage, { recordable: false })

    // Check the right triggers are generated
    expect(triggers).toStrictEqual([{ code, offenceSequenceNumber: 1 }])
  })
})