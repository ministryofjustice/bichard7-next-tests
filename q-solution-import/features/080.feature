Feature: {080} R4.1-BR7-Scenario AJ-Fixed Penalty Notice for Disorder (Dealt with at first hearing)

			"""
			{080} R4.1-BR7-Scenario AJ-Fixed Penalty Notice for Disorder (Dealt with at first hearing)
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Penalty Notice handling and Results (Judgement with Final Result) automation.
			An individual is issued with a fixed penalty notice for being drunk and disorderly by the police.
			A PenaltyNoticeCaseReference (which is actually the ‘FS/REF’ value on the PNC) is assigned.
			The individual may then subsequently elect to go to court.
			He is therefore summonsed (using the same ASN) to attend court.
			The individual appears at court, pleads guilty and is fined £100.
			The PNC response to the ASN query includes the information that this is a PND and the solution generates a PENHRG (the Arrest Summons Record on the PNC has a “PenaltyNoticeCaseReference” and so the Bichard7 solution must generate a PENHRG message in order to update the PNC).
			This result is classified as a “Judgement with Final Result” by the solution.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/080" in the PNC
		When message id "q-solution/080" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
