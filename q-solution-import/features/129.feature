Feature: {129} BR7 R5.1-RCD411-No PNC Offence End Date

			"""
			{129} BR7 R5.1-RCD411-No PNC Offence End Date
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Code Matching where a Court Offence has an End Date but a PNC Offence does not.
			Specifically:
			- Whilst the Offence Codes are valid there is no End Date associated with one of the PNC Offences.
			Therefore no update is applied and instead an Exception is generated

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 129" in the PNC
		When message id "q-solution/129" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

