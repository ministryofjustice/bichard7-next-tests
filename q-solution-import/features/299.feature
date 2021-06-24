Feature: {299} BR7-R5.9-RCD401-501-Results Already On PNC-Identical Remand

			"""
			{299} BR7-R5.9-RCD401-501-Results Already On PNC-Identical Remand
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying 'Results already on PNC' processing where Remand Results (Adjournment Pre Judgement) are received from Magistrates Court.
			Offences with corresponding Results matching identically to those received from Court are already present on the PNC.
			No General Event Log entry of 'Results already on PNC' is generated since it is impossible for the Bichard7 solution to determine whether this interim update is a duplicate.
			The Results from Court are successfully added to the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 299" in the PNC
		When message id "q-solution/299" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

