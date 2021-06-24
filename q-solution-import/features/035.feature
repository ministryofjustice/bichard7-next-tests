Feature: {035} R3.3_BR7_Remove HO Exception for No Results

			"""
			{035} R3.3_BR7_Remove HO Exception for No Results
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court output where no Court Results are received for an Offence.
			PPA Court Hearing Result is sent through the CJSE and onto Bichard7 containing a dummy ASN, an Offence with Offence Category 'B7' and no results.
			The solution ignores the results (since PNC has no interest) and logs the message to the General Event Log.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 035" in the PNC
		When message id "q-solution/035" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

