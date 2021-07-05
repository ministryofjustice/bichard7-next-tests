Feature: {085} R2_AD_001 (Audit Log)

			"""
			{085} R2_AD_001 (Audit Log)
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Audit Log functionality (the persistence of key, user-related actions as records in the database).

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
