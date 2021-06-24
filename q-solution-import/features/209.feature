Feature: {209} BR7-R5.4-RCD548-Offence Added In Court, Adj Pre Judg, PNC Adj exists

			"""
			{209} BR7-R5.4-RCD548-Offence Added In Court, Adj Pre Judg, PNC Adj exists
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation where an Offence is Added In Court which cannot be added to the PNC.
			- Message 1: All Offences Adjourned with Judgement (NEWREM & DISARR).
			- Message 2: Results received from Court including an Offence Added In Court (CJ03522).
			'CJ03522' is an Offence that is not accepted by the PNC and is therefore stripped off the PNC Update by the solution.
			The PNC Update is generated and successfully sent onto the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 209" in the PNC
		When message id "q-solution/209" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

