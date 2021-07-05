Feature: {172} BR7 R5.3-RCD513 - Both Offence Types added in court

			"""
			{172} BR7 R5.3-RCD513 - Both Offence Types added in court
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Ignored Offences handling (Ignored Offences with Recordable Results) where both Ignored Offences and Recordable Offences are Added In Court.
			Specifically:
			- Message 1: Offence 1 (Recordable Offence, Recordable Result) = Judgement With Final Result, Offence 2 Added In Court (Ignored Offence, Recordable Result) = Judgement With Final Result, Offence 3 Added In Court (Recordable Offence, Recordable Result) = Adjournment With Judgement
			PNC Update is generated for Offences 1 and 3 and the Court Hearing Results are successfully and automatically added onto the PNC (including the Recordable Offence Added In Court).
			The 2nd Offence is Ignored since it is not present on the PNC and is recognised by the solution as an Offence in the DoNotAddToPNCCategory.
			Pre Update Triggers are created on the Portal - this includes a Trigger (TRPR0006) for the Recordable Results received against the Ignored Offence.

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
