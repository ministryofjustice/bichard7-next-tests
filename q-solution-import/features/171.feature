Feature: {171} BR7 R5.3-RCD513 - Stop List Offence added in court - 4583

			"""
			{171} BR7 R5.3-RCD513 - Stop List Offence added in court - 4583
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Ignored Offences handling (Ignored Offences with Recordable Results) where the Ignored Offence is Added In Court.
			Specifically:
			- Message 1: Offence 1 (Recordable Offence, Stop List Result), Offence 2 Added In Court (Ignored Offence, Recordable Result) = Judgement With Final Result
			An Exception is created since the Offence on the PNC has a Stop Listed Result, leaving the only remaining Offence to match being the Offence Added In Court - which doesn't match the Offence on the PNC.
			Pre Update Triggers are created on the Portal - this includes a Trigger (TRPR0006) for the Recordable Results received against the Ignored Offence.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/171" in the PNC
		When message id "q-solution/171" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
