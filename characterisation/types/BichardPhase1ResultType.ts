import type { AnnotatedHearingOutcome } from "./AnnotatedHearingOutcome"
import type { Trigger } from "./Trigger"

type BichardPhase1ResultType = {
  triggers: Trigger[]
  hearingOutcome: AnnotatedHearingOutcome
}

export default BichardPhase1ResultType
