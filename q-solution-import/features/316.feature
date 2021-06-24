Feature: {316} BR7 R5.11-RCD528 - 2060_No PNC update for 2050 result with other Non-Recordable result

			"""
			{316} BR7 R5.11-RCD528 - 2060_No PNC update for 2050 result with other Non-Recordable result
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the change made to 2060 disposal with a 2050 result where PNC updated for 2060 result, Offence added in court, TRPS0010 produced.
			No PNC update is generated for result code 2050 where another Non-Recordable result is present on same offence

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 316" in the PNC
		When message id "q-solution/316" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

