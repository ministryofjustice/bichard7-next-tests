Feature: {309} BR7-R5.10-RCD655-Case Re-Opened-Stat Dec-Business Scenario 5

			"""
			{309} BR7-R5.10-RCD655-Case Re-Opened-Stat Dec-Business Scenario 5
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the Case Re-Opened/Statutory Declaration business process.
			A Defendant is charged, heard and sentenced and the details of the Case are updated on the PNC with the results considered Final (such that there are no outstanding details remaining on the PNC).
			The decision is then made to make an Appearance to make a Statutory Declaration.
			At the Hearing the Appearance to make a Statutory Declaration is noted as "Invalidated by Statutory Declaration".
			Court Hearing results are sent through the CJSE and onto Bichard7 detailing the Appearance to make a Statutory Declaration - as well as another Recordable Offence - using the original Case ASN and PTIURN.
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
		And there is a valid record for "q-solution/309" in the PNC
		When message id "q-solution/309" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
