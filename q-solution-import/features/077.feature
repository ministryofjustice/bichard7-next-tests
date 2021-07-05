Feature: {077} R4.0_BR7_Offence Code Schema Relaxation - same Local Offence for different Offences

			"""
			{077} R4.0_BR7_Offence Code Schema Relaxation - same Local Offence for different Offences
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Local Offences handling, Exception generation and Exception resubmission via the Portal.
			Court Hearing results containing a Non Recordable Local Offence are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			Exception is created, displayed and resolved on the Portal via data update and record resubmission.
			In addition the Local Offence Code is checked to ensure the solution has recognised not only that the Offence is a Local Offence but also that it has been recognised as a Local Offence for a specific Force.
			PNC Exception Update is generated and the Court Hearing Results with portal-revised values (ASN) are successfully added onto the PNC.
			The Local Offence is stripped out of the update to the PNC.
			A 2nd set of Court Hearing results containing a Recordable Local Offence are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The Local Offence is recognised not only as a Local Offence but also as a Local Offence for a specific Force.
			The update attempt to the PNC fails since the Recordable Local Offence is not recognised by the PNC and an Exception is successfully generated to identify that manual resolution is required.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
