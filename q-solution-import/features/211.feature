Feature: {211} BR7 R5.4-RCD538-Tagging-4xQualifiers None BA-no Qualifiers to be added to the PNC

			"""
			{211} BR7 R5.4-RCD538-Tagging-4xQualifiers None BA-no Qualifiers to be added to the PNC
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Adjournment With Judgement), Result Code Qualifier handling, Electronic Tagging handling and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing Adjournment With Judgement information which also includes 4 x Result Code Qualifiers.
			None of the Result Code Qualifiers are "BA" (Electronic Tagging) but the Result Text from Court does include "to be electronically monitored".
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The solution recognises that none of the Result Code Qualifiers are of interest to the PNC and are purposely ignored.
			However, because the Result Text includes "to be electronically monitored" the solution ensures that this information is included in the update to the PNC.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			PNC is verified to ensure Electronic Tagging details have been added.
			Pre Update Trigger is also successfully created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 211" in the PNC
		When message id "q-solution/211" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

