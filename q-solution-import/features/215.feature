Feature: {215} BR7 R5.4-RCD498-Off.Seq.No. recalculation-Case Split-HO100228

			"""
			{215} BR7 R5.4-RCD498-Off.Seq.No. recalculation-Case Split-HO100228
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Hearing Results automation and Offence Sequence Number recalculation where ASN changes are made that result from a case switching from containing a single CCR on the PNC to multiple CCRs on the PNC during submissions from the solution to the PNC.
			A Case containing a single CCR Group is present on the PNC (Offences are all to be heard in the same Court at the same Court Hearing).
			Court Hearing Results are received which generates an Exception on the Portal.
			The Case on the PNC is then Split such that there are 2 x CCR Groups (Offences are to be heard at different Courts).
			The Split effected on the PNC also re-numbers the Offences on the PNC.
			The Exception on the Portal is corrected and then resubmitted and the PNC is successfully updated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 215" in the PNC
		When message id "q-solution/215" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

