jest.setTimeout(30000)

import { SpiPlea } from "../types/Plea"
import { TriggerCode } from "../types/TriggerCode"
import { SpiVerdict } from "../types/Verdict"
import generateMessage from "../helpers/generateMessage"
import World from "../../../../steps/world"
import processMessage from "../helpers/processMessage"

const code = TriggerCode.TRPR0008
const matchingOffenceCode = "BA76004"

describe("TRPR0008", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should generate a case trigger for a single guilty offence with a matching offence code", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        {
          code: matchingOffenceCode,
          finding: SpiVerdict.Guilty,
          results: [{ code: 1015 }]
        }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage)

    // Check the right triggers are generated
    expect(triggers).toStrictEqual([{ code }])
  })

  it("should generate a case trigger for a single offence with a matching offence code and plea of Admits", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        {
          code: matchingOffenceCode,
          finding: SpiVerdict.NotGuilty,
          results: [{ code: 1015 }],
          plea: SpiPlea.Admits
        }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage)

    // Check the right triggers are generated
    expect(triggers).toStrictEqual([{ code }])
  })

  it("should not generate a trigger if only the offence code matches", async () => {
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

  it("should not generate a trigger if the offence code matches and another offence is guilty", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        {
          code: matchingOffenceCode,
          finding: SpiVerdict.NotGuilty,
          results: [{ code: 1015 }]
        },
        {
          code: "CJ88116",
          finding: SpiVerdict.Guilty,
          results: [{ code: 1015 }]
        }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false })

    // Check the right triggers are generated
    expect(triggers).toHaveLength(0)
  })

  it("should not generate a trigger if there is no result", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        {
          code: matchingOffenceCode,
          finding: SpiVerdict.NotGuilty,
          results: []
        }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false })

    // Check the right triggers are generated
    expect(triggers).toHaveLength(0)
  })

  it("should only generate a single case level trigger for multiple matching offences", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        {
          code: matchingOffenceCode,
          finding: SpiVerdict.Guilty,
          results: [{ code: 1015 }]
        },
        {
          code: matchingOffenceCode,
          finding: SpiVerdict.Guilty,
          results: [{ code: 1015 }]
        }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage)

    // Check the right triggers are generated
    expect(triggers).toStrictEqual([{ code }])
  })

  it("should generate a trigger when the record is not recordable", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [
        {
          code: matchingOffenceCode,
          finding: SpiVerdict.Guilty,
          results: [{ code: 1015 }],
          recordable: false
        }
      ]
    })

    // Process the mock message
    const { triggers } = await processMessage(inputMessage, { recordable: false })

    // Check the right triggers are generated
    expect(triggers).toStrictEqual([{ code }])
  })
})
