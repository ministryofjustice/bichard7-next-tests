Feature: {259} BR7 R5.7-RCD616-Case Reallocation-Force Owner Court Area MISmatch-NO Trigger Exclusions-Unresolved Exception

			"""
			{259} BR7 R5.7-RCD616-Case Reallocation-Force Owner Court Area MISmatch-NO Trigger Exclusions-Unresolved Exception
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Case Reallocation:
			An existing Case containing an Unresolved Exception is Reallocated to another Force.
			The Case is identified as heard in a different Area to the New Police Force responsible for the Case but since no additional Triggers would have been created no "Out of Area" Trigger is produced.
			In addition no "Trigger Case Reallocated" Trigger is raised since the Case has Unresolved Exceptions and the New Police Force takes at least one of the generated Triggers for the Case.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 259" in the PNC
		When message id "q-solution/259" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

