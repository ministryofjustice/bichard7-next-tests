Feature: {126} BR7 R5.1-RCD411-Date Codes 1 and 5 Offence Matching

			"""
			{126} BR7 R5.1-RCD411-Date Codes 1 and 5 Offence Matching
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Code Matching where a PNC Offence has an End Date but a matching Court Offence does not and the Court Offence has Offence Date Code values of 1 or 5.
			Specifically:
			- Offence 1 is associated to an OffenceDateCode value of '1' and has no Court Offence End Date.
			However, the PNC matching Offence DOES have an associated PNC Offence End Date therefore this is considered a match and the Trigger is raised to alert the user to the fact that details may need to be manually updated
			- Offence 2 is associated to an OffenceDateCode value of '5' and has no Court Offence End Date.
			However, the PNC matching Offence DOES have an associated PNC Offence End Date therefore this is considered a match and the Trigger is raised to alert the user to the fact that details may need to be manually updated
			Successful update of the PNC is made and PRE and POST Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 126" in the PNC
		When message id "q-solution/126" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

