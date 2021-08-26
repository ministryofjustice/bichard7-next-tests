Feature: {073} R4.0_BR7_Convert No Conviction for 2050-2051 to Not Guilty

			"""
			{073} R4.0_BR7_Convert No Conviction for 2050-2051 to Not Guilty
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation for Victim Surcharge - SPI ResultedCaseMessage sent through the CJSE and onto Bichard 7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.

			MadeTech Definition:
			Converting no conviction for 2050 and 2051 to not guilty
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Should
	@ReadyForValidation
	@NeedsRunningAgainstPNC
	Scenario: Converting no conviction for 2050 and 2051 to not guilty
		Given I am logged in as a "supervisor"
			And I view the list of exceptions
		Then there are no exceptions or triggers
			And the PNC updates the record
