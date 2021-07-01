Feature: {199} BR7-R5.3.2-RCD556-Offence Dismissed-Lesser Offence Added

			"""
			{199} BR7-R5.3.2-RCD556-Offence Dismissed-Lesser Offence Added
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Result Class calculation and Dismissed and Lesser Offences (Offences Added In Court) processing.
			Specifically:
			Court Hearing Results are received for which the Defendant is found "Not Guilty" but is still "Guilty" of a Lesser Offence.
			The original Offence is resulted as "Dismissed".
			The Offence is replaced with another Offence (Added In Court) at the same Hearing and Sentenced.
			The Result Class for the "Dismissed" Offence/Result is set to "Judgement With Final Result".
			The "Dismissed" Offence also includes a Free Text Result and this Result Class is set to "Unresulted".
			The Offence replacing the "Dismissed" Offence is Sentenced and the Result Class is set to "Judgement With Final Result".
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			A Post Update Trigger is generated to alert the Police to the fact that the Lesser Offence has been Added to the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/199" in the PNC
		When message id "q-solution/199" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
