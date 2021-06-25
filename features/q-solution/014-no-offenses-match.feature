Feature: {014} R3_BR7_EX_001a_No Offences Match

			"""
			{014} R3_BR7_EX_001a_No Offences Match
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Matching and Exception generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is NOT generated as the solution recognises a mismatch between those Offences received from Court and those on the PNC - in this case no Offence received from Court matches those held against the Impending Prosecution Record on the PNC.
			An Exception is also successfully created and manually resolved via the Portal.

			MadeTech Definition:
			Test that PNC detects a mismatch on offences and they can be manually resolved.
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: Test that PNC detects a mismatch on offences and they can be manually resolved
		Given I am logged in as a "supervisor"
		And there is a valid record for "q-solution test 014" in the PNC
		When message id "q-solution/014" is received
		And I view the list of exceptions
		Then I see trigger "HO100304" in the exception list table
		And I open the record for "EXONEA EXCEPTION"
		And I click the "Triggers" tab
		And I resolve all of the triggers
		# Missing mark as manually resolved step
		And the PNC record has not been updated

