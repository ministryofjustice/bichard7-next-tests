jest.setTimeout(30000)

import type { GenerateMessageOptions } from "../helpers/generateMessage"
import generateMessage from "../helpers/generateMessage"
// import PostgresHelper from "../helpers/PostgresHelper"
import processMessage from "../helpers/processMessage"

describe("HO100108", () => {
  afterAll(() => {
    // PostgresHelper.closeConnection()
  })

  it("should create an exception if the remand status is invalid", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      bailStatus: "X",
      offences: [{ results: [{}] }]
    })

    // Process the mock message
    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100108",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "RemandStatus"]
      }
    ])
  })

  it("should create an exception if the offence remand status is invalid", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [{ results: [{ bailStatus: "X" }] }]
    })

    // Process the mock message
    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100108",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "OffenceRemandStatus"
        ]
      }
    ])
  })

  it("should create an exception if the offence verdict is invalid", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [{ finding: "X", results: [{}] }]
    } as any as GenerateMessageOptions)

    // Process the mock message
    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100108",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "Verdict"
        ]
      }
    ])
  })

  it("should create an exception if the offence mode of trial is invalid", async () => {
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [{ modeOfTrial: "0", results: [{}] }]
    })

    // Process the mock message
    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100108",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "ModeOfTrialReason"
        ]
      }
    ])
  })
})
