Feature: {272} BR7-R5.8-RCD535 - MIS Reports Upload verification

			"""
			{272} BR7-R5.8-RCD535 - MIS Reports Upload verification
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies the capability to upload MIS Reports to the Portal for subsequent downloading by all types of Users.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/272" in the PNC
		When message id "q-solution/272" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
