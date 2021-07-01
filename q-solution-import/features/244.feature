Feature: {244} BR7 R5.6-RCD592-Witness Warrant-4586

			"""
			{244} BR7 R5.6-RCD592-Witness Warrant-4586
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Witness Warrant handling.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			An Exception is generated since the Offences contain only Results which cannot be used to update the PNC (i.e.
			the Results are all in the ResultCode StopList) A Case-level Pre Update Trigger is also generated based on the ResultCodes received (i.e.
			the Warrant Issued Trigger is only created once per Case irrespective of the number of matching conditions encountered).

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/244" in the PNC
		When message id "q-solution/244" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
