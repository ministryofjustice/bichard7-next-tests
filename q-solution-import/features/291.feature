Feature: {291} BR7-R5.8-RCD641 - Police Bail Variation Refused

			"""
			{291} BR7-R5.8-RCD641 - Police Bail Variation Refused
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies the handling of Police Bail Variation Results by the Bichard7 solution.
			Non-Police Prosecution (NPPA) Court Hearing Results containing a Non-Recordable Offence and Refused Police Bail Variation Results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The entire Case is identified as of no interest to the PNC since the ASN is a Dummy ASN, the Offence is non-recordable and the results are therefore purposely ignored.

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
