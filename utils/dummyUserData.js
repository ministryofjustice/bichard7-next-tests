// Note: These users are only created automatically when running against Postgres - they will need seeding in DB2 or LDAP
module.exports = {
  supervisor: {
    inclusionList: ["B01", "B41ME00"],
    exclusionList: [],
    visible_courts: ["B01", "B41ME00"],
    visible_forces: [],
    excluded_triggers: [],
    groups: ["B7Supervisor", "B7NewUI"]
  },
  generalhandler: {
    inclusionList: ["B01", "B41ME00"],
    exclusionList: [],
    visible_courts: ["B01", "B41ME00"],
    visible_forces: [],
    excluded_triggers: [],
    groups: ["B7GeneralHandler", "B7NewUI"]
  },
  triggerhandler: {
    inclusionList: ["B01", "B41ME00"],
    exclusionList: [],
    visible_courts: ["B01", "B41ME00"],
    visible_forces: [],
    excluded_triggers: [],
    groups: ["B7TriggerHandler"]
  },
  exceptionhandler: {
    inclusionList: ["B01", "B41ME00"],
    exclusionList: [],
    visible_courts: ["B01", "B41ME00"],
    visible_forces: [],
    excluded_triggers: [],
    groups: ["B7ExceptionHandler", "B7NewUI"]
  },
  auditor: {
    inclusionList: ["B01", "B41ME00"],
    exclusionList: [],
    visible_courts: ["B01", "B41ME00"],
    visible_forces: [],
    excluded_triggers: [],
    groups: ["B7Audit"]
  },
  "met.police": {
    inclusionList: ["001"],
    exclusionList: [],
    visible_courts: ["001"],
    visible_forces: [],
    excluded_triggers: [],
    groups: ["B7Supervisor"]
  },
  "wilt.shire": {
    inclusionList: ["054"],
    exclusionList: [],
    visible_courts: ["054"],
    visible_forces: [],
    excluded_triggers: [],
    groups: ["B7Supervisor"]
  },
  "super.fivefour": {
    inclusionList: ["054"],
    exclusionList: [],
    visible_courts: ["054"],
    visible_forces: [],
    excluded_triggers: [],
    groups: ["B7Supervisor"]
  },
  "br7.btp": {
    inclusionList: ["093"],
    exclusionList: [],
    visible_courts: ["093"],
    visible_forces: [],
    excluded_triggers: [],
    groups: ["B7Supervisor"]
  },
  "west.yorkshire": {
    inclusionList: ["013"],
    exclusionList: [],
    visible_courts: ["013"],
    visible_forces: [],
    excluded_triggers: [],
    groups: ["B7Supervisor"]
  },
  "essex.user": {
    inclusionList: ["042"],
    exclusionList: [],
    visible_courts: [],
    visible_forces: ["042"],
    excluded_triggers: [],
    groups: ["B7Supervisor"]
  },
  "norfolk.user": {
    inclusionList: ["036"],
    exclusionList: [],
    visible_courts: [],
    visible_forces: ["036"],
    excluded_triggers: [],
    groups: ["B7Supervisor"]
  },
  "trigger.fivefourexcl": {
    inclusionList: ["B01HO", "B01EF"],
    exclusionList: ["TRPR0003", "TRPR0004", "TRPR0006"],
    visible_courts: ["B01HO", "B01EF"],
    visible_forces: [],
    excluded_triggers: ["TRPR0003", "TRPR0004", "TRPR0006"],
    groups: ["B7TriggerHandler"]
  },
  "general.handlerexclone": {
    inclusionList: ["B01HO", "B01EF"],
    exclusionList: ["TRPR0004", "TRPR0006"],
    visible_courts: ["B01HO", "B01EF"],
    visible_forces: [],
    excluded_triggers: ["TRPR0004", "TRPR0006"],
    groups: ["B7GeneralHandler"]
  },
  "herts.user": {
    inclusionList: ["041"],
    exclusionList: [],
    visible_courts: [],
    visible_forces: ["041"],
    excluded_triggers: [],
    groups: ["B7Supervisor", "B7NewUI"]
  }
};
