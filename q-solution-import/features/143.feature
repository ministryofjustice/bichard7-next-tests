Feature: {143} BR7 R5.5_RCD563-Breach of Bail-Plea of Denies

			"""
			{143} BR7 R5.5_RCD563-Breach of Bail-Plea of Denies
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying 'Breach of Bail' Trigger generation where the Defendant Denies the charge of Breaching existing Bail Conditions.
			The PNC already holds details of an existing Offence with which the Defendant is being charged and the Offence has currently been Remanded (Adjournment Pre Judgement).
			The Defendant is then charged with Breaching Bail Conditions (BA76004) and the results for this Offence (Added In Court) are sent from Court at the same time as the results for the existing Offence.
			The Defendant 'Denies' the new Charge but is found Guilty at the Hearing anyway.
			The results from Court include this information; namely a Plea of ‘Denies’ is sent alongside the Verdict of Guilty.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The Offence Added In Court is ignored by the solution since it is a Non-Recordable Offence.
			The existing Offence on the PNC is successfully updated and Pre Update Triggers are created including the Breach of Bail Trigger to alert PNC Resulters to the additional Offence heard at the Court Hearing.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 143" in the PNC
		When message id "q-solution/143" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

