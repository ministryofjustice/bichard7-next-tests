jest.setTimeout(30000)

import generateMessage from "../helpers/generateMessage"
import World from "../../steps/world"
import processMessage from "../helpers/processMessage"

describe("HO100200", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should create an exception if the Court Hearing Location value is invalid", async () => {
    const inputMessage = generateMessage({
      courtHearingLocation: "inval!d",
      offences: [{ results: [{ code: 1015 }] }]
    })

    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100200",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Hearing", "CourtHearingLocation", "OrganisationUnitCode"]
      },
      {
        code: "HO100200",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "SourceOrganisation", // SourceOrganisation is generated from CourtHearingLocation
          "OrganisationUnitCode"
        ]
      },
      {
        code: "HO100300",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "Result",
          0,
          "CourtType"
        ]
      }
    ])
  })
})
