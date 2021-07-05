Feature: {083} R4.1_BR7_Welsh Language Handling

			"""
			{083} R4.1_BR7_Welsh Language Handling
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the handling of Court Results containing Welsh Language characters, Exception generation, Exception resubmission via the Portal and automation of Results to the PNC.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing Welsh Language characters.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			Exception is created, displayed and resolved on the Portal via data update and record resubmission.
			Verification is also made that the Welsh Language characters are displayed 'as-is' via the Portal.
			PNC Exception Update is generated and the Court Hearing Results with portal-revised values (ASN & prepending the Offence Result Text with '**') are successfully added onto the PNC.
			Verification is made (by checking the PNC) that the Welsh Language characters have been correctly converted in the PNC Update.
			Pre and Post Update Triggers are also generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
