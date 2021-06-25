Feature: {006} R3_BR7_TR_003_TRPS0002

			"""
			{006} R3_BR7_TR_003_TRPS0002
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result) and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			A Post Update Trigger is also successfully created on the Portal and manually resolved.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "supervisor"
		And there is a valid record for "q-solution test 006" in the PNC
		When message id "q-solution/006" is received
#		And I view the list of exceptions
#		Then I see trigger "PR10 - Conditional bail" in the exception list table
#		And pending

