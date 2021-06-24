Feature: {062} R3.5_BR7_TF_004

			"""
			{062} R3.5_BR7_TF_004
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Trigger Rule functionality, Exception and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is NOT generated and an Exception is created.
			The solution recognises that a Global Trigger EXCLUSION rule has been set for a specific Force and specific INCLUSION Trigger rules are in place Triggers will be created for that Force.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 062" in the PNC
		When message id "q-solution/062" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

