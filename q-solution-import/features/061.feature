Feature: {061} R3.5_BR7_TF_003

			"""
			{061} R3.5_BR7_TF_003
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Trigger Rule functionality, Exception and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is NOT generated and an Exception is created.
			The solution recognises that a Global Trigger INCLUSION rule has been set for a specific Force and specific EXCLUSION Trigger rules are in place Triggers will NOT be created for that Force.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/061" in the PNC
		When message id "q-solution/061" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
