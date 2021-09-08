Feature: {146} BR7 R5.2-RCD490-TRPR0025 case reopened with original offences

			"""
			{146} BR7 R5.2-RCD490-TRPR0025 case reopened with original offences
			===============
			Q-Solution Definition:

			MadeTech Definition:
			Case reopened with original offences
			"""

	Background:
		Given "input-message" is received

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: Case reopened with original offences
		When I am logged in as a "supervisor"
			And I view the list of exceptions
		Then there are no exceptions or triggers
			And the audit log contains "Re-opened / Statutory Declaration case ignored"
