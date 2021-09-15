// Note: These users are only created automatically when running against Postgres - they will need seeding in DB2 or LDAP
module.exports = {
  supervisor: {
    inclusionList: ["B01", "B41ME00"],
    exclusionList: [],
    groups: ["B7Supervisor"]
  },
  generalhandler: {
    inclusionList: ["B01", "B41ME00"],
    exclusionList: [],
    groups: ["B7GeneralHandler"]
  },
  triggerhandler: {
    inclusionList: ["B01", "B41ME00"],
    exclusionList: [],
    groups: ["B7TriggerHandler"]
  },
  exceptionhandler: {
    inclusionList: ["B01", "B41ME00"],
    exclusionList: [],
    groups: ["B7ExceptionHandler"]
  },
  auditor: {
    inclusionList: ["B01", "B41ME00"],
    exclusionList: [],
    groups: ["B7Audit"]
  },
  "met.police": {
    inclusionList: ["001"],
    exclusionList: [],
    groups: ["B7Supervisor"]
  },
  "wilt.shire": {
    inclusionList: ["054"],
    exclusionList: [],
    groups: ["B7Supervisor"]
  },
  "super.fivefour": {
    inclusionList: ["054"],
    exclusionList: [],
    groups: ["B7Supervisor"]
  },
  "br7.btp": {
    inclusionList: ["093"],
    exclusionList: [],
    groups: ["B7Supervisor"]
  },
  "west.yorkshire": {
    inclusionList: ["013"],
    exclusionList: [],
    groups: ["B7Supervisor"]
  },
  "essex.user": {
    inclusionList: ["042"],
    exclusionList: [],
    groups: ["B7Supervisor"]
  },
  "norfolk.user": {
    inclusionList: ["036"],
    exclusionList: [],
    groups: ["B7Supervisor"]
  },
  "trigger.fivefourexcl": {
    inclusionList: ["B01HO", "B01EF"],
    exclusionList: ["TRPR0003", "TRPR0004", "TRPR0006"],
    groups: ["B7TriggerHandler"]
  },
  "general.handlerexclone": {
    inclusionList: ["B01HO", "B01EF"],
    exclusionList: ["TRPR0004", "TRPR0006"],
    groups: ["B7GeneralHandler"]
  },
  "herts.user": {
    inclusionList: ["041"],
    exclusionList: [],
    groups: ["B7Supervisor"]
  }
};
