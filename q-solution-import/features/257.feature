Feature: {257} BR7 R5.7-RCD616-Case Reallocation-Force Owner Court Area MISmatch-SOME Trigger Exclusions

			"""
			{257} BR7 R5.7-RCD616-Case Reallocation-Force Owner Court Area MISmatch-SOME Trigger Exclusions
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Case Reallocation:
			An existing Case is Reallocated to another Force.
			The Case is identified as heard in a different Area to the New Police Force responsible for the Case and additional Triggers would have been created, therefore an "Out of Area" Trigger is created.
			Whilst there are no Unresolved Exceptions no "Trigger Case Reallocated" Trigger is raised since the New Police Force responsible for the Case takes at least one of the Triggers that would be generated for the Case.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 257" in the PNC
		When message id "q-solution/257" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

