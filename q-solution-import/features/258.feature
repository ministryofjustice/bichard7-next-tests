Feature: {258} BR7 R5.7-RCD616-Case Reallocation-Force Owner Court Area match-ALL Trigger Exclusions

			"""
			{258} BR7 R5.7-RCD616-Case Reallocation-Force Owner Court Area match-ALL Trigger Exclusions
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Case Reallocation:
			An existing Case is Reallocated to another Force.
			The Case is identified as heard in the same Area as the New Police Force responsible for the Case so no Out of Area Trigger is produced and instead a "Trigger Case Reallocated" Trigger is raised.
			This is because the Case has no Unresolved Exceptions and no Triggers are otherwise being generated to raise awareness of the Case to the New Force.

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
