Feature: {189} BR7 R5.3-RCD482 - Offence added in court - Sentenced

			"""
			{189} BR7 R5.3-RCD482 - Offence added in court - Sentenced
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Results automation where existing Offences are Sentenced and Offences are Added In Court with an Adjudication.
			Specifically:
			The following Results are received from Court
			- Message 1: All Offences = Adjournment With Judgement
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			- Message 2: All Existing Offences = Sentence, Offences also Added In Court = Judgment With FInal Result
			Offences Added In Court can only be added to a CCR Group without an Adjudication and at the point that Adjudication is received for the Offence itself.
			Since this is not the case the Offence Added In Court is not added to the PNC.
			PNC Update is otherwise generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			A Post Update Trigger (to identify the requirement to manually add the Offence Added In Court to the PNC) is created on the Portal.
			Pre Update Triggers are also created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
