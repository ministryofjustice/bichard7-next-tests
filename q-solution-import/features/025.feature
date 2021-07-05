Feature: {025} R3.1_BR7_SD_001_Second Duration Update

			"""
			{025} R3.1_BR7_SD_001_Second Duration Update
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result), Suspended Sentence handling and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing 2nd Duration values.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC using the 'S' qualifier (Wholly Suspended).
			A Case-Level Pre Update Trigger is also successfully created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
