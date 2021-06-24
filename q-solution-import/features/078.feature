Feature: {078} R4.0_BR7_Offence Code Schema Relaxation - schema Breaking  Offence Codes

			"""
			{078} R4.0_BR7_Offence Code Schema Relaxation - schema Breaking  Offence Codes
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying 'Schema-breaking' Local Offences handling and Exception generation.
			Court Hearing results containing a Local Offence where all 8x permissible digits (including the 8th digit - the Offence qualifier, making the Offence value invalid against the schema) are used are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			Exception is created on the Portal.
			The Local Offence Code is known to the solution and all relevant Offence-related values are displayed.
			A 2nd set of Court Hearing again containing a Local Offence where all 8x permissible digits (including the 8th digit - the Offence qualifier, making the Offence value invalid against the schema) are used are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			Exception is created on the Portal.
			The Local Offence Code is unknown to the solution and all relevant Offence-related values are displayed.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 078" in the PNC
		When message id "q-solution/078" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

