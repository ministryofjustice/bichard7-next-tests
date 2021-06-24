Feature: {152} BR7 R5.2.2-RCD518 - 2xResult Code Only - NG - Final Result

			"""
			{152} BR7 R5.2.2-RCD518 - 2xResult Code Only - NG - Final Result
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Breach Trigger generation.
			"Not Guilty" Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			An Exception is generated since the Offence contains only Results which cannot be used to update the PNC (i.e.
			the Results are all in the ResultCode StopList) An Offence-level Pre Update Trigger is also generated based on the ResultCodes received (i.e.
			the Breach Trigger is only created once per Offence irrespective of the number of matching conditions encountered).

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 152" in the PNC
		When message id "q-solution/152" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

