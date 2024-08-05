import type { AnnotatedHearingOutcome } from "./AnnotatedHearingOutcome"
import type { Trigger } from "./Trigger"

type BichardPhase2ResultType = {
  triggers: Trigger[]
  outputMessage: AnnotatedHearingOutcome
}

export default BichardPhase2ResultType
