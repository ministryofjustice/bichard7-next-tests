Feature: {092} R4.1.1_BR7_CSV Report via Portal

			"""
			{092} R4.1.1_BR7_CSV Report via Portal
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Work Allocation Report functionality which is currently used only by the Metropolitan Police.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
