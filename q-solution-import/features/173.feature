Feature: {173} BR7 R5.3-RCD497 - Partial Match - Fine Amount

			"""
			{173} BR7 R5.3-RCD497 - Partial Match - Fine Amount
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Identical Offence Matching where different Results are received and the Court Offence Dates are within the date range of the matching PNC Offence.
			Specifically:
			- Offences 1 and 2 are identical but the Results received from Court are not (Fines of different amounts are imposed as part of Sentencing)
			The solution cannot automatically update the PNC since there is no way to uniquely determine which Result belongs to which Offence on the PNC and therefore an Exception is generated.
			PNC Exception Update is generated and the Court Hearing Results with portal-added values (Offence Sequence Numbers) are successfully added onto the PNC.
			Pre Update Triggers are created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/173" in the PNC
		When message id "q-solution/173" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
