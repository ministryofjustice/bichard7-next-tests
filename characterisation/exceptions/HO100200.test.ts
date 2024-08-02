jest.setTimeout(30000)

import World from "../../utils/world"
import { generateSpiMessage } from "../helpers/generateMessage"
import { processPhase1Message } from "../helpers/processMessage"

describe("HO100200", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("should create an exception if the Court Hearing Location value is invalid", async () => {
    const inputMessage = generateSpiMessage({
      courtHearingLocation: "inval!d",
      offences: [{ results: [{ code: 1015 }] }]
    })

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toContainEqual({
      code: "HO100200",
      path: ["AnnotatedHearingOutcome", "HearingOutcome", "Hearing", "CourtHearingLocation", "OrganisationUnitCode"]
    })
    expect(exceptions).toContainEqual({
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
    })
    // TODO: Core doesn't generate the HO100300 yet
    // expect(exceptions).toContainEqual({
    //   code: "HO100300",
    //   path: [
    //     "AnnotatedHearingOutcome",
    //     "HearingOutcome",
    //     "Case",
    //     "HearingDefendant",
    //     "Offence",
    //     0,
    //     "Result",
    //     0,
    //     "CourtType"
    //   ]
    // });
  })
})
