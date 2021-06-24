Feature: {242} BR7 R5.6-RCD562-Sine Die Results then Withdrawn

			"""
			{242} BR7 R5.6-RCD562-Sine Die Results then Withdrawn
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies those changes brought about as part of RCD entry #562.
			Court Hearing Results are sent through the CJSE and onto Bichard7 containing Offences that are all resulted Sine Die (2007) generating PRE Update Triggers and an update of the PNC.
			Subsequent Court Hearing Results are sent through the CJSE and onto Bichard7 Withdrawing all of the Offences (the Defendant has been Sentenced in Crown Court on a separate Case for a very long time and for far more serious Offences than those for which he is being charged here, hence the decision to Withdraw them).
			The information returned from the PNC Query includes the '2007' (Adjourned Sine Die) Results and so the only way the Final Results from Court can be updated on the PNC is via the SUBVAR PNC Message.
			The PNC is successfully updated and the Final Results from Court are automatically added to the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 242" in the PNC
		When message id "q-solution/242" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

