Feature: {027} R3.2_Orphaned Non-Recordable Offence

			"""
			{027} R3.2_Orphaned Non-Recordable Offence
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Orphaned Non-Recordable Offence handling.
			Court Hearing results are sent through the CJSE and onto Bichard7 withdrawing the 1st of 2x Offences.
			The remaining (Non-Recordable) Offence is Remanded.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			A second, Court Hearing result is sent through the CJSE and onto Bichard7.
			The solution recognises the Non-Recordable Offence as present on the PNC and successfully adds the results automatically onto the PNC.

			MadeTech Definition:
			This tests that no exceptions are created for Orphaned Non-Recordable offence
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: No exceptions are created for orphaned non-recordable offence
		Given there is a valid record for "q-solution/027" in the PNC
		When message id "q-solution/027A" is received
		And I am logged in as a "general handler"
		And I view the list of exceptions
		Then there are no exceptions raised for "Wells Homer"
		When message id "q-solution/027B" is received
		And I view the list of exceptions
		Then there are no exceptions raised for "Wells Homer"
		And pending
		And the PNC updates the record
