Feature: {011} R2_Regression_NPPA_PP_002

			"""
			{011} R2_Regression_NPPA_PP_002
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Police Prosecuting Authority (PPA) Court Results, Exception generation and Case Re-Direction.
			PPA Court Hearing Results are sent through the CJSE and onto Bichard7 containing a dummy ASN and a recordable offence generating an Exception on the Portal and no PNC Update.
			The Force Owner is revised to reflect ownership by a different Force (in this case Force '093') and resubmitted.
			The Case is Redirected onto the Force as specified in the revised Force Owner value ('093').
			This is then verified by logging in as Users belonging to Forces that SHOULD NOT and SHOULD be able to view the Exception Record.
			An additional PPA Court Hearing Result is sent through the CJSE and onto Bichard7 containing a dummy ASN and no recordable offences/results which results in the solution ignoring the results (since PNC has no interest) and logging the message to the General Event Log.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 011" in the PNC
		When message id "q-solution/011" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

