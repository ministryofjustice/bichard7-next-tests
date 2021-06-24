Feature: {308} BR7-R5.10-RCD655-Case Re-Opened-Stat Dec-Business Scenario 4

			"""
			{308} BR7-R5.10-RCD655-Case Re-Opened-Stat Dec-Business Scenario 4
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the Case Re-Opened/Statutory Declaration business process.
			A Defendant is charged, heard and sentenced and the details of the Case are updated on the PNC with the results considered Final (such that there are no outstanding details remaining on the PNC).
			The decision is then made to make an Application to Re-Open the Case.
			The Application to Re-Open the Case is accepted at the Hearing and the Case is Adjourned.
			Court Hearing results are sent through the CJSE and onto Bichard7 detailing the Application to Re-Open the Case - as well as another Recordable Offence - using the original Case ASN and PTIURN.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from the PNC and also from static data tables held within the Exchange-hosted solution.
			The solution recognises that the Case is a 'Re-Opened/Statutory Declaration' and does the following:
			- Generates NO Exceptions (despite errors having been encountered during processing)
			- Generates a Re-Opened/Statutory Declaration Trigger
			- Attempts NO PNC Updates

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 308" in the PNC
		When message id "q-solution/308" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

