Feature: {131} BR7 R5.1.3-RCD467-Single CCR-SENDEF-NEWREM

			"""
			{131} BR7 R5.1.3-RCD467-Single CCR-SENDEF-NEWREM
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying NEWREM & SENDEF combinations.
			These PNC Message Types are not compatible for a single CCR Group but they can be used to update separate CCR Groups.
			Specifically, for a single CCR Group:
			- Message 1: Offences Adjourned with/without Judgement (NEWREM & DISARR)
			- Message 2: Offences Adjourned without Judgement, Offence Sentenced (NEWREM, SENDEF)
			Message 2 produces a successful update to the PNC (NEWREM and SENDEF) since the Offences without a Judgement will now actually reside in a separate CCR Group to the Offence with an Adjudication
			- Message 3: All Offences Adjourned with Judgement (NEWREM & DISARR)
			- Message 4: Offences Adjourned Post Judgement, Offence Sentenced (NEWREM, SENDEF)
			All Offences reside in the same CCR Group at this point and therefore the potential update to the PNC (NEWREM and SENDEF) is not possible.
			Message 4 creates an Exception.
			Pre Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 131" in the PNC
		When message id "q-solution/131" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

