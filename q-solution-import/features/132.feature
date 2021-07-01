Feature: {132} BR7 R5.1.3-RCD467-Single CCR-SENDEF-Offence Added In Court

			"""
			{132} BR7 R5.1.3-RCD467-Single CCR-SENDEF-Offence Added In Court
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying DISARR & SENDEF combinations.
			These PNC Message Types are not compatible for a single CCR Group.
			Specifically, for a single CCR Group:
			- Message 1: All Offences Adjourned with Judgement (NEWREM & DISARR)
			- Message 2: Offences Sentenced, Offence Added In Court (DISARR, SENDEF)
			All Offences reside in the same CCR Group at this point and therefore the potential update to the PNC DISARR and SENDEF) is not possible.
			The solution instead generates the SENDEF and instead of an Exception creates a Post Update Trigger (TRPS0011) for the Offence Added In Court.
			Pre Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/132" in the PNC
		When message id "q-solution/132" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
