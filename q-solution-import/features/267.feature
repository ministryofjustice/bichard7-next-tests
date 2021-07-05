Feature: {267} BR7 R5.7-RCD486-Exception-Only Case Reallocation-Force Owner Court Area MISmatch-ALL Trigger Exclusions

			"""
			{267} BR7 R5.7-RCD486-Exception-Only Case Reallocation-Force Owner Court Area MISmatch-ALL Trigger Exclusions
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Case Reallocation:
			An existing Case containing only Exceptions (no Triggers) is Reallocated to another Force.
			No "Trigger Case Reallocated" Trigger is raised since the Case contains Unresolved Exceptions.
			However, even though this is an Exception-only Case additional Triggers would have been generated therefore an "Out of Area" Trigger is generated.

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
