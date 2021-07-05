Feature: {162} BR7 R5.3-RCD505 - Ignored offence - Result Class

			"""
			{162} BR7 R5.3-RCD505 - Ignored offence - Result Class
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Ignored Offences handling where the Offences are present on the PNC.
			Specifically:
			- Message 1: All Ignored Offences Adjourned With Judgement (NEWREM & DISARR)
			PNC Updates are generated and the Court Hearing Results are successfully added automatically onto the PNC.
			- Message 2: All Ignored Offences Sentenced (SENDEF)
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			Pre Update Triggers are also successfully created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
