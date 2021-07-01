Feature: {290} BR7-R5.8-RCD641 - Police Bail Variation Granted

			"""
			{290} BR7-R5.8-RCD641 - Police Bail Variation Granted
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies the handling of Police Bail Variation Results by the Bichard7 solution.
			Police Prosecution (PPA) Court Hearing Results containing a Non-Recordable Offence and Granted Police Bail Variation Results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The entire Case is identified as of no interest to the PNC since the ASN is a Dummy ASN, the Offence is non-recordable and the results are therefore purposely ignored.
			The Bail Conditions Trigger is generated and the Case appears as part of the Bail Conditions Report.
			The "Personal details changed" Trigger is also produced.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/290" in the PNC
		When message id "q-solution/290" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
