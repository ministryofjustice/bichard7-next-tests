Feature: {158} BR7 R5.2.2-RCD518 - Result class Sentence & Adjournment Post Judgement

			"""
			{158} BR7 R5.2.2-RCD518 - Result class Sentence & Adjournment Post Judgement
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Breach Results automation (Adjournment With Judgement, Adjournment Post Judgement and Sentence).
			- Message 1: All Offences Adjourned with Judgement (NEWREM & DISARR)
			PNC Updates are generated and the Court Hearing Results are successfully added automatically onto the PNC.
			- Message 2: Offence 1 = Adjourned Post Judgment (NEWREM), Offence 2 = Sentenced (SENDEF)
			An Exception is created, correct and resubmitted from the Portal.
			A 2nd Exception is created since there are now incompatible PNC Message Types (NEWREM & SENDEF) and these cannot both be used to update the same single CCR Group.
			Verification is made of the Breach updates to the PNC.
			Pre Update Triggers are generated.
			In addition the Breach Trigger is created for Offence 2 only since this Offence is being Sentenced at this point.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 158" in the PNC
		When message id "q-solution/158" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

