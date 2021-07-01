Feature: {194} BR7-R5.4-RCD548-R5.3.2-RCD556-Breach Offence with Re-sentence for original offence

			"""
			{194} BR7-R5.4-RCD548-R5.3.2-RCD556-Breach Offence with Re-sentence for original offence
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Result Class calculation and Breach scenario processing.
			Specifically:
			Court Hearing Results are received for a Breach Offence for which a Re-Sentencing of the original Offence is imposed.
			The Defendant Admits the Breach Offence.
			The Result Class for the New Breach Offence/Result is set to "Judgement With Final Result".
			The Result Class for the Offence providing details of the Re-Sentencing is set to "Sentence".
			The New Breach Offence is Resulted as "Dealt with for Original Offence" and the solution recognises this as a Result that cannot be added to the PNC (i.e.
			it is a Stop Listed Result); the Offence therefore has no Results and an Exception is created for manual resolution on the Portal.
			Pre Update Triggers are also created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/194" in the PNC
		When message id "q-solution/194" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
