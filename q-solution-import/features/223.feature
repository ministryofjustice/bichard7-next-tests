Feature: {223} BR7-R5.5-RCD576-PNC_Adj-Existing_Offences_Adj_Post_Judg-Offence_Added_Adj_Pre_Judg

			"""
			{223} BR7-R5.5-RCD576-PNC_Adj-Existing_Offences_Adj_Post_Judg-Offence_Added_Adj_Pre_Judg
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offences Added in Court behaviour as follows:
			Current PNC Status = Adjudication exists
			Existing Offences are resulted as: Adjournment Post Judgement
			An Offence Added in Court is resulted as: Adjournment Pre Judgement
			The Offence Added in Court cannot be added to the PNC so a Trigger is generated instead.
			The PNC is otherwise successfully updated with Court Hearing Results.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 223" in the PNC
		When message id "q-solution/223" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

