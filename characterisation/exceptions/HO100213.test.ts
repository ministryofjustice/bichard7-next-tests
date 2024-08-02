jest.setTimeout(30000)

import World from "../../utils/world"
import { generateSpiMessage } from "../helpers/generateMessage"
import processMessage from "../helpers/processMessage"

describe("HO100213", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.ifNewBichard("should create an exception if the Person's given name 1 is too many characters", async () => {
    const inputMessage = generateSpiMessage({
      person: { givenName1: "X".repeat(36) },
      offences: [{ results: [] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100213",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "DefendantDetail",
          "PersonName",
          "GivenName",
          0
        ]
      }
    ])
  })

  it.ifNewBichard("should create an exception if the Person's given name 2 is too many characters", async () => {
    const inputMessage = generateSpiMessage({
      person: { givenName1: "one", givenName2: "X".repeat(36) },
      offences: [{ results: [] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100213",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "DefendantDetail",
          "PersonName",
          "GivenName",
          1
        ]
      }
    ])
  })

  it.ifNewBichard("should create an exception if the Person's given name 3 is too many characters", async () => {
    const inputMessage = generateSpiMessage({
      person: { givenName1: "one", givenName2: "Two", givenName3: "X".repeat(36) },
      offences: [{ results: [] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100213",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "DefendantDetail",
          "PersonName",
          "GivenName",
          2
        ]
      }
    ])
  })
})
