Feature: {054} R3.4_BR7_Duration Unit_Session

			"""
			{054} R3.4_BR7_Duration Unit_Session
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result) and 'Session' handling.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing Sentence information in terms of the number of 'Sessions' the Defendant must attend.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 054" in the PNC
		When message id "q-solution/054" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

