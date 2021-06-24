Feature: {059} R3.5_BR7_TF_001

			"""
			{059} R3.5_BR7_TF_001
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Trigger Rule functionality, Exception and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is NOT generated and an Exception is created.
			The solution recognises that a Global Trigger INCLUSION rule has been set for the Police Force and NO specific Trigger rule is in place; therefore Triggers (Pre Update, in this case) will be successfully created for that Force.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 059" in the PNC
		When message id "q-solution/059" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

