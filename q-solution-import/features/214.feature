Feature: {214} BR7 R5.4-RCD471-Multiple CCR to Single CCR switch between PNC submissions

			"""
			{214} BR7 R5.4-RCD471-Multiple CCR to Single CCR switch between PNC submissions
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Hearing Results automation where ASN changes are made that result from a case switching from containing multiple CCRs on the PNC to a single CCR on the PNC during submissions from the solution to the PNC.
			A Case containing multiple CCR Groups is present on the PNC (Offences are to be heard in different Courts).
			Court Hearing Results are received which generates an Exception on the Portal.
			The Case on the PNC is then Merged such that all Offences are part of a single CCR Group (Offences are to all to be heard in the same Court at the same Hearing).
			The Exception on the Portal is corrected and then resubmitted and the PNC is successfully updated.
			Pre and Post Update Triggers are also generated on the Portal.

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
