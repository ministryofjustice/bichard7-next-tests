Feature: {238} BR7 R5.6-Scenario AK-Fixed Penalty Notice for Disorder (Case adjourned)

			"""
			{238} BR7 R5.6-Scenario AK-Fixed Penalty Notice for Disorder (Case adjourned)
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Penalty Notice Handling where 'Adjournment Pre Judgement', 'Adjournment With Judgement', 'Adjournment Post Judgement' and 'Sentence' results are separately received from Court.
			An individual is issued with a fixed penalty notice for being drunk and disorderly by the police.
			A PenaltyNoticeCaseReference (which is actually the ‘FS/REF’ value on the PNC) is assigned.
			The individual may then subsequently elect to go to court.
			He is therefore summonsed (using the same ASN) to attend court.
			The individual appears at court, pleads not guilty and is remanded on unconditional bail.
			The PNC response to the ASN query includes the information that this is a PND and the solution generates NEWREM message.
			This result is classified as “Adjournment pre judgement” by the solution which generates a remand update.
			The PNC is successfully updated.

			The individual appears in court again where a verdict is reached and he is Remanded on Unconditional Bail.
			The PNC response to the ASN query includes the information that this is a PND and the solution attempts to generate a PENHRG and NEWREM messages (the Arrest Summons Record on the PNC has a “PenaltyNoticeCaseReference” and so the Bichard7 solution must generate a PENHRG message in order to update the PNC).
			This result is classified as “Adjournment with judgement” by the solution.

			The individual appears in court again where he is Remanded on Unconditional Bail for Sentencing.
			The PNC response to the ASN query includes the information that this is a PND and the solution attempts to generate a PENHRG and NEWREM messages (the Arrest Summons Record on the PNC has a “PenaltyNoticeCaseReference” and so the Bichard7 solution must generate a PENHRG message in order to update the PNC).
			This result is classified as “Adjournment post judgement” by the solution.
			Exception HO100314 (PNC Query returned a system fault) was generated.
			The PNC Error message returned is: “ENQUIRY ERROR NO SUITABLE DISPOSAL GROUPS”.
			No update to the PNC is made.
			The user (exception handler) should update the results on the PNC manually.

			The individual complies with the remand on bail, re-appears at court and fined £100.
			The PNC response to the ASN query includes the information that this is a PND and the solution attempts to generate a PENHRG message.
			Exception HO100314 (PNC Query returned a system fault) is generated.
			The PNC Error message returned is: “ENQUIRY ERROR NO SUITABLE DISPOSAL GROUPS”.
			No update to the PNC is made.
			The user (exception handler) should update the results on the PNC manually.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/238" in the PNC
		When message id "q-solution/238" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
