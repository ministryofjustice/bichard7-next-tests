Feature: R3.1_BR7_PU_004_CC_Filter

			"""
			R3.1_BR7_PU_004_CC_Filter
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying one of the most powerful elements of the Bichard7 solution; namely the behaviour of the rules which establish those Magistrates Courts that are/are not permitted to update the PNC (the "PNC Update Filter").
			In addition Result Code Transformation is also verified.
			For this Test specifically:
			Where POLICE FORCE values have been configured as EXCLUDED and COURT values have been configured as EXCLUDED within the PNC Update Filter and whether Forces will be permitted to potentially update the PNC based upon this configuration.
			CJS Result Code “4558” is also transformed to a “2059” PNC Disposal in order for PNC to accept the update from Magistrates Court.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test R3.1_BR7_PU_004_CC_Filter" in the PNC
		When message id "q-solution/R3.1_BR7_PU_004_CC_Filter" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

