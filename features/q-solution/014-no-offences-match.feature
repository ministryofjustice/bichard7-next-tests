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
			Add a record to Bichard that does not match the PNC record. Manually resolve
			the trigger so that the record is flagged as resolved, but do not update the PNC.
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: Test that PNC detects a mismatch on offences and they can be manually resolved
		Given I am logged in as a "supervisor"
		And there is a valid record for "q-solution/014" in the PNC
		When message id "q-solution/014" is received
		And I view the list of exceptions
		Then I see trigger "HO100304" in the exception list table
		When I open the record for "EXONEA EXCEPTION"
		And I click the "Triggers" tab
		Then I see trigger "TRPR0003" for offence "1"
		And I manually resolve the record
		And I view the list of exceptions
		Then the record for "EXONEA EXCEPTION" is "Resolved"
		And the PNC record has not been updated

