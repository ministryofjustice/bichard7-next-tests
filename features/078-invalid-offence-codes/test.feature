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
			Testing invalid offence codes
			"""

	Background:
		Given the data for this test is in the PNC

	@Could
	@Problem
	@Excluded
	Scenario: Testing invalid offence codes
		Given "<messageId>" is received
			And I am logged in as a "general handler"
			And I view the list of exceptions
		Then I see exception "HO100306" in the exception list table
			And the PNC record has not been updated

		Examples:
			| messageId       |
			| input-message-1 |
			| input-message-2 |
