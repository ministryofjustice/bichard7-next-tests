jest.setTimeout(30000)

import generateMessage from "../helpers/generateMessage"
import World from "../../steps/world"
import processMessage from "../helpers/processMessage"

describe("HO100212", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  // Won't pass when running against Bichard as HO100212 is never generated
  // If the person's title is too long, it fails schema validation and thus fails to parse the XML
  // so no exceptions are raised!
  it.skip("should create an exception if the Person's title is too many characters", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 1015 }] }]
    })

    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100212",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "DefendantDetail",
          "PersonName",
          "Title"
        ]
      }
    ])
  })
})
