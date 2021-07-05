Feature: {133} BR7 R5.1.3-RCD467-Single CCR-SENDEF-Offence Added In Court-DoNotAddToPNC

			"""
			{133} BR7 R5.1.3-RCD467-Single CCR-SENDEF-Offence Added In Court-DoNotAddToPNC
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offences Added In Court handling as part of Sentencing where the Offence falls into the "DoNotAddToPNCCategory".
			Specifically:
			- Message 1: All Offences Adjourned with Judgement (NEWREM & DISARR)
			- Message 2: Offences Sentenced, Offence Added In Court in DoNotAddToPNCCategory (SENDEF)
			All Offences reside in the same CCR Group at this point.
			The Offence Added In Court falls into the DoNotAddToPNCCategory and is stripped out of the update to the PNC.
			This leaves just the Sentences for the existing Offences and the update to the PNC (SENDEF) is successful.
			Pre Update Triggers are also created.

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
