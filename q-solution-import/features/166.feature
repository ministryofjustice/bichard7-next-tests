Feature: {166} BR7 R5.3-RCD505 - Ignored offence - Stop List Result

			"""
			{166} BR7 R5.3-RCD505 - Ignored offence - Stop List Result
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Ignored Offences handling where the Offences are present on the PNC and the Results received from Court are in the Stop List.
			Specifically:
			- Message 1: All Ignored Offences - Results received are in the Stop List
			No PNC Update is generated and No Exception or Trigger is created.
			The solution recognises the Results received as being in the Result Codes Stop List and the Results are purposely ignored.
			Verification is made that this processing has been logged to the database (into the General Event Log).

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/166" in the PNC
		When message id "q-solution/166" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
