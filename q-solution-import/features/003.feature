Feature: {003} R3_BR7_TR_003_TRPR0012

			"""
			{003} R3_BR7_TR_003_TRPR0012
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Ignored Results (Result Codes), Exception, Trigger and Generic Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is NOT generated as the solution recognises a Result Code as present in a Stop List .
			An Exception and Pre Update Triggers are also successfully created including Generic Triggers configured for both Non-Recordable and Recordable Offences (i.e.
			with a setting of "Both).

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/003" in the PNC
		When message id "q-solution/003" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
