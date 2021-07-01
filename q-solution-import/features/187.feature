Feature: {187} BR7 R5.3-RCD494 - Date Match with Stop List Result

			"""
			{187} BR7 R5.3-RCD494 - Date Match with Stop List Result
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Matching and approximate Date Matching with multiple instances of the same result.
			Specifically:
			Where multiple Offences match on Offence and Result - with the Exception of a Stop List Result on one of the Offences - and the Date Range of the Court Offence data is within the Offence Date Range on the PNC.
			The solution will recognise the Stop List Result received as being in the Result Codes Stop List and strip the Result (1505) from the update that is generated to the PNC.
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			Pre Update Trigggers are also created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/187" in the PNC
		When message id "q-solution/187" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
