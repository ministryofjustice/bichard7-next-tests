Feature: {268} BR7 R5.7-RCD486-Incorrect Case Reallocation-Force Owner Court Area MISmatch-ALL Trigger Exclusions

			"""
			{268} BR7 R5.7-RCD486-Incorrect Case Reallocation-Force Owner Court Area MISmatch-ALL Trigger Exclusions
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Case Reallocation:
			An existing Case is Reallocated to another Force.
			The Case is identified as heard in a different Area to the New Police Force responsible for the Case and additional Triggers would have been created.
			However, no Out of Area Trigger is produced and instead a "Trigger Case Reallocated" Trigger is raised.
			This is because the Case has no Unresolved Exceptions and no Triggers are otherwise being generated to raise awareness of the Case to the New Force.
			The Case is identified as incorrectly Reallocated and is sent back to the original Force.
			No "Out of Area" Trigger is raised since the Case is identified as heard in the same Area and the Police Force responsible for the Case.
			No "Trigger Case Reallocated" Trigger is raised since at least 1x Trigger is raised as part of the Reallocation.

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
