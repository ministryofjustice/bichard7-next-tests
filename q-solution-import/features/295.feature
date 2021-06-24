Feature: {295} BR7-R5.9-RCD545-Duplicate Offences where 1 Offence is Added In Court-DIFFERENT Result Text IS used as PNC Disposal Text

			"""
			{295} BR7-R5.9-RCD545-Duplicate Offences where 1 Offence is Added In Court-DIFFERENT Result Text IS used as PNC Disposal Text
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Matching and Result Text/PNC Disposal Text handling.
			Court Hearing Results are received from Magistrates Court where:
			- Identical Offences are present
			- The Results include Result Text that IS used to generate PNC Disposal Text
			- The Result Text for each Identical Offence is DIFFERENT
			- One of the Offences has actually been Added In Court (i.e.
			is not on the PNC)
			The Bichard7 solution is unable to determine which PNC Offence should be updated (Identical Offences received from Court with different Result Text that IS used to generate PNC Disposal Text) so an Exception is created.
			The Exception is resolved on the Portal via data update and record resubmission.
			PNC Exception Update is generated and the Court Hearing Results with portal-added values (Offence Sequence Numbers) are successfully added onto the PNC.
			PRE Update Triggers are also successfully created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 295" in the PNC
		When message id "q-solution/295" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

