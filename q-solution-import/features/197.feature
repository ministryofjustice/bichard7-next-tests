Feature: {197} BR7-R5.3.2-RCD556-Offence Withdrawn

			"""
			{197} BR7-R5.3.2-RCD556-Offence Withdrawn
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Result Class calculation and Withdrawn Offences processing.
			Specifically:
			Court Hearing Results are received for which all Offences are resulted as "Withdrawn".
			The Result Class for the Offence/Result is set to "Judgement With Final Result".
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/197" in the PNC
		When message id "q-solution/197" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
