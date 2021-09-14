Feature: {041} R3.3_BR7_Operational Trigger Report

			"""
			{041} R3.3_BR7_Operational Trigger Report
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying a specific Operational Report providing a live summary allowing a manager to to see those Triggers that are unresolved after 7 Days.

			MadeTech Definition:
			Generating the operational trigger report
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Could
	@NeedsValidating
	@Excluded
	@NeedsRunningAgainstPNC
	Scenario: Generating the operational trigger report
		Given I am logged in as "supervisor"
			And I view the list of exceptions
			And pending
