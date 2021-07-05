Feature: {296} BR7-R5.9-RCD545-Duplicate Offences-DIFFERENT Result Text IS used as PNC Disposal Text

			"""
			{296} BR7-R5.9-RCD545-Duplicate Offences-DIFFERENT Result Text IS used as PNC Disposal Text
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Matching and Result Text/PNC Disposal Text handling.
			Court Hearing Results are received from Magistrates Court where:
			- Identical Offences are present
			- The Results include Result Text that IS used to generate PNC Disposal Text
			- The Result Text for each Identical Offence is DIFFERENT
			The Bichard7 solution is unable to determine which PNC Offence should be updated (Identical Offences received from Court with different Result Text that IS used to generate PNC Disposal Text) so an Exception is created.
			The Exception is resolved on the Portal via data update and record resubmission.
			PNC Exception Update is generated and the Court Hearing Results with portal-added values (Offence Sequence Numbers) are successfully added onto the PNC.
			PRE Update Triggers are also successfully created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
