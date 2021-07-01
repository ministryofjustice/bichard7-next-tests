Feature: {159} BR7 R5.3-RCD482 - Offence added in court - Adj Post Judgement

			"""
			{159} BR7 R5.3-RCD482 - Offence added in court - Adj Post Judgement
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Results automation and the correct PNC Message Type generation where Offences are Added In Court.
			Specifically:
			- Message 1: Offence 1 = Adjournment with Judgement (NEWREM & DISARR)
			PNC Updates are generated and the Court Hearing Results are successfully added automatically onto the PNC.
			- Message 2: Offence 1 = Adjournment Post Judgment (NEWREM ONLY), Offence 2 (Added In Court) = Adjournment With Judgement
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			A Post Update Trigger is also successfully created on the Portal for the Offence (that cannot be) Added In Court and is manually resolved.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/159" in the PNC
		When message id "q-solution/159" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
