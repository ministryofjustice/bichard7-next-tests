Feature: {149} R5.1.3_BR7_CRQ453_Change of ReportOwner on PNC

			"""
			{149} R5.1.3_BR7_CRQ453_Change of ReportOwner on PNC
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Force Owner calculation is ultimately derived from details passed back by the PNC during a PNC query.
			The Court Hearing Results received contain both valid PTIURN and valid ASN values so the Bichard7 solution uses the FSC segment returned in the ASN Query Response from the PNC to determine the Force (i.e.
			those users) that is able to view the Trigger Records that are created.
			This is then verified by logging in as Users belonging to Forces that SHOULD NOT and SHOULD be able to view the Record.
			Note that this Test follows the standard MET Police practice as advised by Steve Green i.e.
			changing only the report Owner and not the Originator of the ASN.
			Post Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/149" in the PNC
		When message id "q-solution/149" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
