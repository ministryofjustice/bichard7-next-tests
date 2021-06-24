Feature: {225} BR7-R5.5-RCD576-PNC_No_Adj-Existing_Offences_Adj_Pre_Judg-Offence_Added_Adj_With_Judg

			"""
			{225} BR7-R5.5-RCD576-PNC_No_Adj-Existing_Offences_Adj_Pre_Judg-Offence_Added_Adj_With_Judg
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offences Added in Court behaviour as follows:
			Current PNC Status = No Adjudication exists
			Existing Offences are resulted as: Adjournment Pre Judgement
			An Offence Added in Court is resulted as: Adjournment With Judgement
			The Offence Added in Court can be added to the PNC and a Trigger is also generated as a result.
			The PNC is successfully updated with Court Hearing Results.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 225" in the PNC
		When message id "q-solution/225" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

