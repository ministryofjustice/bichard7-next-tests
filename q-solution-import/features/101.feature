Feature: {101} R4.1.3_BR7_New Trigger TRPR0016

			"""
			{101} R4.1.3_BR7_New Trigger TRPR0016
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Results automation (Judgement with Final Result) and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			A Generic Pre Update Trigger configured for both Recordable Offences only (i.e.
			with a setting of "R") is also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 101" in the PNC
		When message id "q-solution/101" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

