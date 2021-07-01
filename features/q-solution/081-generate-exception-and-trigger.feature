Feature: {081} R4.1-BR7_Bail Conditions Pre Trigger

			"""
			{081} R4.1-BR7_Bail Conditions Pre Trigger
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Exception and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is NOT generated as the solution identifies an invalid Organisation Unit code in the Results from Court.
			An Exception is generated to highlight this on the Portal and Pre Update Triggers are also successfully created.

			MadeTech Definition:
			This tests that Bichard generates exceptions and trigger by using an invalid Organisation Unit code in the Results from Court.
			Bichard does not duplicate triggers if the exception is resubmitted without any changes.
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: Trigger and exceptions are created and trigger is not duplicated by resubmitting the exception
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/081" in the PNC
		When message id "q-solution/081" is received
		# Note: After sending the message, PNC matches the request but no record appears in Bichard
		And pending
    	And I open the record for "Manny Pacman"
		And I click the "Triggers" tab
		Then I see trigger "TRPR0010" for offence "1"
		When I view the list of exceptions
    	Then I see exception "HO100200" in the exception list table
		And I see exception "HO100307" in the exception list table
		# When I resubmit the exception "HO100200"
    	# And I open the record for "Manny Pacman"
		# And I click the "Triggers" tab
		# Then I see only one trigger "TRPR0010" for offence "1"
		And pending
