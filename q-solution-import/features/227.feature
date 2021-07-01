Feature: {227} BR7-R5.5-RCD576-PNC_Adj-Existing_Offences_Sentence-Offence_Added_Adj_With_Judg

			"""
			{227} BR7-R5.5-RCD576-PNC_Adj-Existing_Offences_Sentence-Offence_Added_Adj_With_Judg
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offences Added in Court behaviour as follows:
			Current PNC Status = Adjudication exists
			Existing Offences are resulted as: Sentence
			An Offence Added in Court is resulted as: Adjournment With Judgement
			It is not possible to combine SENDEF & NEWREM & DISARR messages in the same transaction for a single CCR Group and an Exception is generated to highlight the need for a manual resolution.
			No Triggers are generated either.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/227" in the PNC
		When message id "q-solution/227" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
