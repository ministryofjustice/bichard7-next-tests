Feature: {201} BR7-R5.3.2-RCD556-Offence Non-Conviction

			"""
			{201} BR7-R5.3.2-RCD556-Offence Non-Conviction
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Result Class calculation and Non-Conviction processing.
			Specifically:
			Court Hearing Results are received for which the Defendant is considered "Unfit To Plead".
			All Offences are given Pleas of "Unfit To Plead" and a Verdict of "Unfit To Plea" is recorded.
			The Result Class for the Offence/Result is set to "Judgement With Final Result".
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			A Pre Update Trigger is also created on the Portal.

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
