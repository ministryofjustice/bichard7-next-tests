Feature: {106} BR7 R5.0-RCD335-Generic Trigger-Post Update Creation

			"""
			{106} BR7 R5.0-RCD335-Generic Trigger-Post Update Creation
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Generic Trigger creation, Results automation (Judgement with Final Result) and Trigger generation.
			This Test ensures that a Generic Trigger can be created outside of the standard release process, i.e.
			without the need for a code change to be made to the Bichard7 solution.
			A new Generic Trigger is created and services are stopped and restarted (in order to ensure that the new Trigger details are picked up as part of the processing the solution does for all Court Hearing Results.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			The new Generic Trigger is also successfully created.

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
