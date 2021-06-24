Feature: {198} BR7-R5.3.2-RCD556-Offence Withdrawn-Replaced-Adjourned

			"""
			{198} BR7-R5.3.2-RCD556-Offence Withdrawn-Replaced-Adjourned
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Result Class calculation and Withdrawn and Replaced Offences (Offences Added In Court) processing.
			Specifically:
			Court Hearing Results are received for which an Offence is resulted as "Withdrawn".
			The Offence is replaced with another Offence (Added In Court) at the same Hearing and Adjourned.
			The Result Class for the "Withdrawn" Offence/Result is set to "Judgement With Final Result".
			The "Withdrawn" Offence also includes a Free Text Result and this Result Class is set to "Unresulted".
			The Offence replacing the "Withdrawn" Offence is Remanded to a Next Hearing and the Result Class is set to "Adjournment Pre Judgement".
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			A Post Update Trigger is generated to alert the Police to the fact that the Replacing Offence has been Added to the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 198" in the PNC
		When message id "q-solution/198" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

