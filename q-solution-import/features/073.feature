Feature: {073} R4.0_BR7_Convert No Conviction for 2050-2051 to Not Guilty

			"""
			{073} R4.0_BR7_Convert No Conviction for 2050-2051 to Not Guilty
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result) and the conversion of 'Non Conviction' results from the Court to 'Not Guilty' results on the PNC for specific Result Codes.
			Court Hearing results are sent through the CJSE and onto Bichard7 where Offences have been Dismissed or Withdrawn (Result Codes 2050 & 2051).
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			The solution will convert the 'Non Conviction' values received from Court into 'Not Guilty' in order for the update to be considered acceptable to the PNC.

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
