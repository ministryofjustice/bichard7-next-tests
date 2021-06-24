Feature: {312} BR7-R5.10-RCD606-Permit Court Offence Sequence Number of 0

			"""
			{312} BR7-R5.10-RCD606-Permit Court Offence Sequence Number of 0
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the reciept of an Offence Sequence Number of '0' from Magistrates court.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			based on ResultedCaseMessage contents.
			No HO100239 Exception is generated for the offence sequence number of '0'.
			PNC is successfully updated with partialresult 3070.
			Urgent Flag and Pre and Post update Triggers are produced as part of the processing of this case.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 312" in the PNC
		When message id "q-solution/312" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

