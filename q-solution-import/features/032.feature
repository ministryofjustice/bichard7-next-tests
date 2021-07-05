Feature: {032} 3.2 UAT - TIC Change

			"""
			{032} 3.2 UAT - TIC Change
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test (from UAT) verifying Offences Taken Into Consideration handling.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing details of Offences Taken Into Consideration both as a Result Code Qualifier (J) and as a Result Code (3118).
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			A PRE Update Trigger is also successfully created on the Portal.

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
