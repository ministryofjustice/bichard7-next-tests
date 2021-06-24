Feature: {018} R3_BR7_NX001_Results Already on PNC

			"""
			{018} R3_BR7_NX001_Results Already on PNC
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result), duplicate results handling and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			A Pre Update Trigger is also successfully created on the Portal.
			A second, identical Court Hearing result (Adjudication and Disposal(s) on the PNC match those in the court result) is sent through the CJSE and onto Bichard7.
			The solution ignores the results (since they are already present on the PNC) and logs the message to the General Event Log.
			A Pre Update Trigger is also successfully created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 018" in the PNC
		When message id "q-solution/018" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

