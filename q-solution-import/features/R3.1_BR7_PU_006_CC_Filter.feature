Feature: R3.1_BR7_PU_006_CC_Filter

			"""
			R3.1_BR7_PU_006_CC_Filter
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying one of the most powerful elements of the Bichard7 solution; namely the behaviour of the rules which establish those Magistrates Courts that are/are not permitted to update the PNC (the "PNC Update Filter").
			For this Test specifically:
			Where POLICE FORCE values have been configured as INCLUDED and COURT values have been configured as EXCLUDED within the PNC Update Filter and whether Forces will be permitted to potentially update the PNC based upon this configuration.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
