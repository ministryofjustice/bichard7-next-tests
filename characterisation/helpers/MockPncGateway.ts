import type PncGateway from "../types/PncGateway"
import type { PncQueryResult } from "../types/PncQueryResult"

export default class MockPncGateway implements PncGateway {
  constructor(private result: PncQueryResult | undefined) {}

  query(_: string): PncQueryResult | undefined {
    return this.result
  }
}
