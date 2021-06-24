Feature: {163} BR7 R5.3-RCD505 - Ignored offence - Adj Pre Judgement

			"""
			{163} BR7 R5.3-RCD505 - Ignored offence - Adj Pre Judgement
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Ignored Offences handling where the Offences are present on the PNC.
			Specifically:
			- Message 1: All Ignored Offences Adjourned Pre Judgement (NEWREM)
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 163" in the PNC
		When message id "q-solution/163" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

