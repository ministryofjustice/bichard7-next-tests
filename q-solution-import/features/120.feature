Feature: {120} BR7 R5.1-238-414-Multiple CCR-Overlapping Offences

			"""
			{120} BR7 R5.1-238-414-Multiple CCR-Overlapping Offences
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying multiple CCR Group processing where there are multiple instances of the same Offence across more than 1x CCR Group.
			The BR7 solution is not able to uniquely identify a match between PNC Offence and Court Offence in order to provide an automated update (since the same Offence exists in more than 1 x CCR Group) and so instead an Exception is created for manual resolution.
			NO PNC Update is generated.
			Pre Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/120" in the PNC
		When message id "q-solution/120" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
