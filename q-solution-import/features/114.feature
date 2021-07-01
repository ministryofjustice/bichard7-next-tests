Feature: {114} BR7 R5.1-RCD384-395-Stop checking Result Code Qualifiers against Result Codes

			"""
			{114} BR7 R5.1-RCD384-395-Stop checking Result Code Qualifiers against Result Codes
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the Result Code Qualifiers Stop List and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			Result Code Qualifiers meeting the following conditions are verified against the update made to the PNC:
			- IS valid for the Result Code AND is present in the stopList.properties file
			- IS valid for the Result Code but is NOT present in the stopList.properties file
			- is NOT valid for the Result Code but is NOT present in the stopList.properties file
			Pre Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/114" in the PNC
		When message id "q-solution/114" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
