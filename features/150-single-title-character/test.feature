Feature: {150} BR7 R5.2-RCD488-Person Title field Single Char

			"""
			{150} BR7 R5.2-RCD488-Person Title field Single Char
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the handling of single character PersonTitle values.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			The Results include a single character value representing the Title of the Defendant.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			Post Update Triggers are also successfully created on the Portal and manually resolved.

			MadeTech Definition:
			Handling messages with a single title character
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Could
	@ReadyToValidate
	@NeedsRunningAgainstPNC
	@ExcludedOnBaseline
	Scenario: Handling messages with a single title character
		Given I am logged in as a "supervisor"
			And I view the list of exceptions
		When I open the record for "PersonTitle Single"
			And I click the "Triggers" tab
		Then I see trigger "TRPS0010" for offence "4"
			And I see trigger "TRPS0010" for offence "5"
			And the PNC updates the record
		When I resolve all of the triggers
		Then the "record" for "PersonTitle Single" is "resolved"
			And the "record" for "PersonTitle Single" is not "unresolved"
			And there are no exceptions
