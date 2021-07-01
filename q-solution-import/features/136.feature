Feature: {136} BR7 R5.1.3-RCD462 - No PNC-End-Date All Offences Dates the same

			"""
			{136} BR7 R5.1.3-RCD462 - No PNC-End-Date All Offences Dates the same
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Code Matching where PNC or Court Start Date and End Dates are equal where only the Court specifies an Offence End Date, it is the same as the Court Offence Start Date and both the Court and PNC Offence Start Dates are the same.
			Specifically:
			- Offence 1 is associated to an OffenceDateCode value of '1' and has both Court Offence Start and End Dates.
			The corresponding PNC Offence has an Offence Start Date only and all 3 x Dates (Court Start, Court End, PNC Start) are identical
			- Offence 2 is associated to an OffenceDateCode value of '1' and has both Court Offence Start and End Dates.
			The corresponding PNC Offence has an Offence Start Date only and all 3 x Dates (Court Start, Court End, PNC Start) are identical
			- Offence 3 is associated to an OffenceDateCode value of '1' and has both Court Offence Start and End Dates.
			The corresponding PNC Offence has an Offence Start Date only and all 3 x Dates (Court Start, Court End, PNC Start) are identical
			Since all Offences are considered a match and no manual update is required on the PNC no Pre Update Triggers (TRPR0018) are generated.
			An Offence is also Added In Court and included in the update to the PNC
			Post Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/136" in the PNC
		When message id "q-solution/136" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
