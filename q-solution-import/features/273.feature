Feature: {273} BR7 R5.8.1-RCD568 - OrganisationName-Appended ltd. Characters

			"""
			{273} BR7 R5.8.1-RCD568 - OrganisationName-Appended ltd. Characters
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies the capability of the Bichard7 solution to handle more than basic characters for Organisation Names received from Court.
			Court Hearing Results from Court for an Organisation whose name value is appended with "ltd." are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The Bichard7 solution resolves all of the characters that the PNC will not accept in the "Name Convicted" field.
			No Exception is generated and the Results are used to successfully update the PNC without any conflict.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 273" in the PNC
		When message id "q-solution/273" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

