Feature: {084} R4.1_BR7_Work Allocation

			"""
			{084} R4.1_BR7_Work Allocation
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying work allocation and Team creation and maintenance.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/084" in the PNC
		When message id "q-solution/084" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
