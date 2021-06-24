Feature: {128} BR7 R5.1-RCD411-No Offence End Dates-Start Dates do not match

			"""
			{128} BR7 R5.1-RCD411-No Offence End Dates-Start Dates do not match
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Code Matching where both PNC and Court Offences have no End Dates AND PNC and Court Offence Start Dates do not match.
			Specifically:
			- Whilst the Offence Codes are valid there are no End Dates associated with the PNC Offences or the Court Offences.
			In addition the Court and PNC Offence Start Date values do not match.
			Therefore no update is applied and instead an Exception is generated

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 128" in the PNC
		When message id "q-solution/128" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

