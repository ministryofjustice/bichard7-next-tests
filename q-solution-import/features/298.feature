Feature: {298} BR7-R5.9-RCD545-Duplicate Offences-DIFFERENT Results-Result Text forced from Portal

			"""
			{298} BR7-R5.9-RCD545-Duplicate Offences-DIFFERENT Results-Result Text forced from Portal
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Matching and Result Text/PNC Disposal Text handling.
			Court Hearing Results are received from Magistrates Court where:
			- Identical Offences are present
			- The Results include Result Text that ISNT used to generate PNC Disposal Text
			- The Results for each Identical Offence are DIFFERENT
			The Bichard7 solution is unable to determine which PNC Offence should be updated (Identical Offences received from Court with different Results) so an Exception is created.
			The Exception is resolved on the Portal via data update and record resubmission.
			At the same time the Result Text is manually 'forced' into becoming part of the update to the PNC (pre-pending the Result Text on the Portal with '**').
			PNC Exception Update is generated and the Court Hearing Results with portal-added values (Offence Sequence Numbers and Result Text details) are successfully added onto the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/298" in the PNC
		When message id "q-solution/298" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
