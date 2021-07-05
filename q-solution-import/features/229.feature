Feature: {229} BR7-R5.5-RCD576-PNC_No_Adj-Existing_Offences_Adj_With_Judg-Offence_Added_Judg_With_Final_Result

			"""
			{229} BR7-R5.5-RCD576-PNC_No_Adj-Existing_Offences_Adj_With_Judg-Offence_Added_Judg_With_Final_Result
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offences Added in Court behaviour as follows:
			Current PNC Status = No Adjudication exists
			Existing Offences are resulted as: Adjournment With Judgement
			An Offence Added in Court is resulted as: Judgement With Final Result
			The Offence Added in Court can be added to the PNC and a Trigger is also generated as a result.
			The PNC is successfully updated with Court Hearing Results.

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
