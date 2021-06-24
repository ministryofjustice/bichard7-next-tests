Feature: {249} BR7 R5.6-RCD581-Granted Bail-Prosecution Appealed Bail

			"""
			{249} BR7 R5.6-RCD581-Granted Bail-Prosecution Appealed Bail
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation of Bail Granted but then Appealed by the Prosecution at the same Court Hearing.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing a Remand (i.e.
			Bail Conditions in the Result) but an Appeal by the Prosecution which is granted and the Defendant is subsequently Remanded into Custody.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The Court Hearing Results are successfully added automatically onto the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 249" in the PNC
		When message id "q-solution/249" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

