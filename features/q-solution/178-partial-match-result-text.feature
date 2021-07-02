Feature: {178} BR7 R5.3-RCD497 - Partial Match - Result Text

			"""
			{178} BR7 R5.3-RCD497 - Partial Match - Result Text
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Identical Offence Matching where different Results are received and the Court Offence Dates are within the date range of the matching PNC Offence.
			Specifically:
			- Offences 1 and 2 are identical but the Results received from Court are not (the Result Text for each Offence is different)
			The solution cannot automatically update the PNC since there is no way to uniquely determine which Result belongs to which Offence on the PNC and therefore an Exception is generated.
			PNC Exception Update is generated and the Court Hearing Results with portal-added values (Offence Sequence Numbers) are successfully added onto the PNC.
			Pre Update Triggers are created on the Portal.

			MadeTech Definition:
			Verifying correct behaviour when the result text for each offence is different
			"""

	@Should
	@ReadyToValidate
	@NeedsRunningAgainstPNC
	Scenario: Verifying correct behaviour when the result text for each offence is different
		Given I am logged in as a "supervisor"
		And there is a valid record for "q-solution/178" in the PNC
		When message id "q-solution/178" is received
		And I view the list of exceptions
		Then I see exception "HO100310" in the exception list table
		When I open the record for "Text Marcus"
		And I click the "Triggers" tab
		Then I see trigger "TRPR0006"
		And I see trigger "TRPR0021" for offence "1"
		And I see trigger "TRPR0021" for offence "2"
		When I click the "Offences" tab
		And I view offence "1"
		And I correct "Sequence Number" to "1"
		And I click the "Offences" tab
		And I view offence "2"
		And I correct "Sequence Number" to "2"
		And I click the "Offences" tab
		And I submit the record
		Then I see exception "(Submitted)" in the exception list table
		When I reload until I see "PR18 - Update offence dates"
		And I open the record for "Text Marcus"
		And I click the "Triggers" tab
		And I see trigger "TRPR0018" for offence "1"
		And I see trigger "TRPR0018" for offence "2"
		And the PNC updates the record