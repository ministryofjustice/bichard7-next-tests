jest.setTimeout(30000)

import World from "../../utils/world"
import generateMessage from "../helpers/generateMessage"
import processMessage from "../helpers/processMessage"
import { TriggerCode } from "../types/TriggerCode"

const code = TriggerCode.TRPR0002
const resultCode = 4575
const resultQualifier = "EO"

describe("TRPR0002", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should generate a trigger for a single offence without the EO result qualifier", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          results: [{ code: resultCode }]
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage)

    expect(triggers).toStrictEqual([{ code }])
  })

  it("should not generate a trigger for a single offence with the EO result qualifier", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          results: [{ code: resultCode, qualifier: resultQualifier }]
        }
      ]
    })

    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false })

    expect(triggers).toHaveLength(0)
  })

  it("should generate a single case trigger for multiple offences without the EO result qualifier", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: resultCode }] }, { results: [{ code: resultCode }] }]
    })

    const { triggers } = await processMessage(inputMessage)

    expect(triggers).toStrictEqual([{ code }])
  })

  it("should not generate a trigger for multiple offences with the EO result qualifier", async () => {
    const inputMessage = generateMessage({
      offences: [
        { results: [{ code: resultCode, qualifier: resultQualifier }] },
        { results: [{ code: resultCode, qualifier: resultQualifier }] }
      ]
    })

    const { triggers } = await processMessage(inputMessage, { expectTriggers: false, expectRecord: false })

    expect(triggers).toHaveLength(0)
  })

  it("should generate a trigger for multiple offences with one EO result qualifier and one without", async () => {
    const inputMessage = generateMessage({
      offences: [
        {
          results: [{ code: resultCode, qualifier: resultQualifier }]
        },
        { results: [{ code: resultCode }] }
      ]
    })

    const { triggers } = await processMessage(inputMessage)

    expect(triggers).toStrictEqual([{ code }])
  })

  it("should generate a trigger when record is not recordable", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: resultCode }], recordable: false }]
    })

    const { triggers } = await processMessage(inputMessage, { recordable: false })

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
