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
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/150" in the PNC
		When message id "q-solution/150" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
