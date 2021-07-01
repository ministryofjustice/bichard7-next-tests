Feature: {134} BR7 R5.1.3-RCD467 - Multiple CCR-SENDEF-NEWREM

			"""
			{134} BR7 R5.1.3-RCD467 - Multiple CCR-SENDEF-NEWREM
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying NEWREM & SENDEF combinations.
			These PNC Message Types are not compatible for a single CCR Group but they can be used to update separate CCR Groups.
			Specifically, for multiple CCR Groups:
			- Message 1: Offences Adjourned with/without Judgement (NEWREM & DISARR)
			- Message 2: Offences Adjourned without Judgement, Offence Sentenced (NEWREM, SENDEF)
			Message 2 produces a successful update to the PNC (NEWREM and SENDEF) since the Offences without an Adjudication reside in a separate CCR Group to the Offence with an Adjudication
			Pre Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/134" in the PNC
		When message id "q-solution/134" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
