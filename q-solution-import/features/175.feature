Feature: {175} BR7 R5.3-RCD497 - Results Match - Different Order

			"""
			{175} BR7 R5.3-RCD497 - Results Match - Different Order
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Identical Offence Matching where Results received are identical but are in a different order for each Offence.
			Specifically:
			- Offences 1, 2 and 3 are identical and the Results received from Court are also identical but appear within the Court Results in a different order
			- Offences 4, 5 and 6 are identical and the Results received from Court are also identical but appear within the Court Results in a different order
			The solution recognises the Offences and their associated results as identical (irrespective of how the results for each Offence have been ordered) and an update to the PNC is successfully generated.
			Pre Update Triggers are created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 175" in the PNC
		When message id "q-solution/175" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

