Feature: {191} BR7-R5.3.2-RCD556-Guilty Verdict-No Conviction Date

			"""
			{191} BR7-R5.3.2-RCD556-Guilty Verdict-No Conviction Date
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Result Class calculation and Exception creation.
			Specifically:
			Court Hearing Results are received finding the Defendant Guilty.
			An Adjudication is imposed ("Guilty") but no Conviction Date is provided.
			The solution creates an Exception indicating manual resolution is required since an automated update to the PNC cannot be generated without a Date of Conviction.
			The Result Class for the Offence/Result combination without the Date of Conviction is set to "Unresulted".

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 191" in the PNC
		When message id "q-solution/191" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

