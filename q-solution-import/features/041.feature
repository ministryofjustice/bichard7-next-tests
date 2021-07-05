Feature: {041} R3.3_BR7_Operational Trigger Report

			"""
			{041} R3.3_BR7_Operational Trigger Report
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying a specific Operational Report providing a live summary allowing a manager to to see those Triggers that are unresolved after 7 Days.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
