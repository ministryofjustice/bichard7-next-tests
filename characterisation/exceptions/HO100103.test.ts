jest.setTimeout(30000)

import World from "../../utils/world"
import generateMessage from "../helpers/generateMessage"
import processMessage from "../helpers/processMessage"

describe("HO100103", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.ifNewBichard("should create an exception if the hearing time is invalid", async () => {
    const inputMessage = generateMessage({
      timeOfHearing: "XXXX",
      offences: [{ results: [{}] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100103",
      path: ["AnnotatedHearingOutcome", "HearingOutcome", "Hearing", "TimeOfHearing"]
    })
  })

  it.ifNewBichard("should create an exception if the offence time is invalid", async () => {
    const inputMessage = generateMessage({
      offences: [{ startTime: "XXXX", results: [{}] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100103",
      path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "Offence", 0, "OffenceTime"]
    })
  })

  it.ifNewBichard("should create an exception if the offence start time is invalid", async () => {
    const inputMessage = generateMessage({
      offences: [{ startTime: "XXXX", offenceDateCode: 4, results: [{}] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100103",
      path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "Offence", 0, "StartTime"]
    })
  })

  it.ifNewBichard("should create an exception if the offence end time is invalid", async () => {
    const inputMessage = generateMessage({
      offences: [{ endDate: new Date(), endTime: "XXXX", results: [{}] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100103",
      path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "Offence", 0, "OffenceEndTime"]
    })
  })

  it.ifNewBichard("should create an exception if the next hearing time is invalid", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ nextHearing: { nextHearingDetails: { timeOfHearing: "XXXX" } } }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100103",
      path: [
        "AnnotatedHearingOutcome",
        "HearingOutcome",
        "Case",
        "HearingDefendant",
        "Offence",
        0,
        "Result",
        0,
        "NextHearingTime"
      ]
    })
  })

  //TODO: Needs implementing once we've implemented in core
  it.skip("should create an exception if the time specified in the result is invalid", async () => {
    const inputMessage = generateMessage({
      offences: [{ endDate: new Date(), endTime: "XXXX", results: [{}] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100103",
      path: [
        "AnnotatedHearingOutcome",
        "HearingOutcome",
        "Case",
        "HearingDefendant",
        "Offence",
        0,
        "Result",
        0,
        "TimeSpecifiedInResult"
      ]
    })
  })
})
