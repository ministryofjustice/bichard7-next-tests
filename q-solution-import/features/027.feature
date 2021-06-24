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
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 027" in the PNC
		When message id "q-solution/027" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

