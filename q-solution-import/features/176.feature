Feature: {176} BR7 R5.3-RCD497 - Partial Match - Date Duration

			"""
			{176} BR7 R5.3-RCD497 - Partial Match - Date Duration
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Result Code Transformation and Identical Offence Matching where the only difference in the Results received is the "Duration" enforced by the Court.
			Specifically:
			- Offences 1, 2 and 3 are identical but the Results received from Court are not (the Duration values imposed as part of Sentencing are different)
			The solution cannot automatically update the PNC since there is no way to uniquely determine which Result belongs to which Offence on the PNC and therefore an Exception is generated.
			PNC Exception Update is generated for the Court Hearing Results with portal-added values (Offence Sequence Numbers).
			CJS Result Code “1507” is transformed to a “1002” PNC Disposal in order for PNC to accept the update from Magistrates Court and the results are successfully added onto the PNC.
			Pre Update Triggers are created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/176" in the PNC
		When message id "q-solution/176" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
