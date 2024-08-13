import World from "../../utils/world"
import { processPhase2Message } from "../helpers/processMessage"
import { asnPath } from "../helpers/errorPaths"
import generateMessage from "../helpers/generateMessage"

jest.setTimeout(30000)

describe.ifPhase2("HO200116", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("creates a HO200116 exception when there are more than 100 offences (there are 110)", async () => {
    const inputMessage = generateMessage("test-data/HO200116/Aho110Offences.xml.njk", {})

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    expect(exceptions).toStrictEqual([
      {
        code: "HO200116",
        path: asnPath
      }
    ])
  })

  it("does not create a HO200116 exception when there are 100 offences", async () => {
    const inputMessage = generateMessage("test-data/HO200116/Aho100Offences.xml.njk", {})

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    expect(exceptions).toHaveLength(0)
  })

  it("does not create a HO200116 exception when there are less than 100 offences (there are 99)", async () => {
    const inputMessage = generateMessage("test-data/HO200116/Aho99Offences.xml.njk", {})

    const {
      outputMessage: { Exceptions: exceptions }
    } = await processPhase2Message(inputMessage)

    expect(exceptions).toHaveLength(0)
  })
})
