Feature: {192} BR7-R5.3.2-RCD556-Adjournment post Trial-Not For Sentencing

			"""
			{192} BR7-R5.3.2-RCD556-Adjournment post Trial-Not For Sentencing
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Result Class calculation and Exception creation.
			Specifically:
			Court Hearing Results are received for 2 x Offences Adourning them both to a Next Hearing.
			However, 1 x Offence has an Adjudication of "Not Guilty" and the other has a Result of "Withdrawn".
			Neither of these combinations is a valid business scenario and therefore the solution creates an Exception indicating manual resolution is required.
			The Result Class for the Offence/Result combination Adjourned with an Adjudication of "Not Guilty" is set to "Unresulted".

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/192" in the PNC
		When message id "q-solution/192" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
