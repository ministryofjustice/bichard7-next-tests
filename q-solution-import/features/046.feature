Feature: {046} #186 - Result text population for Orders - 1st variation

			"""
			{046} #186 - Result text population for Orders - 1st variation
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result), updating the PNC with Result Text and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7 for a number of Orders Results.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results (Result Codes 3025,3041,3047,3106,3107) are successfully added automatically onto the PNC which include a number of specific updates to PNC Disposal Text.
			Pre and Post Update Triggers are also successfully created on the Portal.

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
