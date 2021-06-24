Feature: {065} R3.5_BR7_Populate RCC with PTIURN-Offence Withdrawn

			"""
			{065} R3.5_BR7_Populate RCC with PTIURN-Offence Withdrawn
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result) and 'Replaced With Another Offence' handling.
			Court Hearing results are sent through the CJSE and onto Bichard7 where an Offence has been Replaced With Another Offence in Court.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			The message sent to the PNC will include RCC segment information since an Offence was added in Court (to replace the Offence with which the Defendant was originally charged).

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 065" in the PNC
		When message id "q-solution/065" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

