Feature: {161} BR7 R5.3-RCD505 - Ignored offence - Judge Final Result x2

			"""
			{161} BR7 R5.3-RCD505 - Ignored offence - Judge Final Result x2
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Ignored Offences handling where the Offences are present on the PNC.
			Specifically:
			- Message 1: Ignored Offence 1 = Judgement with Final Result (DISARR)
			PNC Updates are generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Pre Update Triggers are also created and resolved via the Portal.
			- Message 2: Ignored Offence 1 (same Offence as Message 1 but different final results) = Judgement with Final Result
			An Exception is created since there are incompatibilities between the results on the PNC and those received from Court, i.e.
			existing Final Results on the PNC and an Adjudication received from Court.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 161" in the PNC
		When message id "q-solution/161" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

