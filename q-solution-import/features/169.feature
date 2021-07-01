Feature: {169} BR7 R5.3-RCD513 - Some Offences Stop Listed

			"""
			{169} BR7 R5.3-RCD513 - Some Offences Stop Listed
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Ignored Offences handling (Ignored Offences with Recordable Results) where the Ignored Offence is present on the PNC and a Recordable Offence is Added In Court.
			Specifically:
			- Message 1: Offence 1 (Ignored Offence, Recordable Result) = Judgement With Final Result, Offence 2 Added In Court (Recordable Offence) = Judgement With Final Result
			PNC Update is generated for Offence 1 and the Court Hearing Results are successfully and automatically added onto the PNC.
			The 2nd Offence is added to the PNC.
			Pre Update Triggers are created on the Portal - this includes a Trigger (TRPR0006) for the Recordable Results received against the Ignored Offence.
			Post Update Triggers are created to identify the Offence Added In Court.
			All Triggers are Resolved via the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/169" in the PNC
		When message id "q-solution/169" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
