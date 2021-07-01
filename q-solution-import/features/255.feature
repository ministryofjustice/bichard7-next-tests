Feature: {255} BR7 R5.7-RCD612-Force Owner Court Area MISmatch-ALL Trigger Exclusions

			"""
			{255} BR7 R5.7-RCD612-Force Owner Court Area MISmatch-ALL Trigger Exclusions
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Out of Area Trigger handling:
			Court Hearing results are sent through the CJSE and onto Bichard7 Remanding the Defendant into Custody and marking the Case as a Domestic Violence Case.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from the PNC and also from static data tables held within the Exchange-hosted solution.
			An "Out of Area" Trigger is raised since the Case is identified as heard in a different Area to the Police Force responsible for the Case and additional Triggers would have been created.
			The PNC is successfully updated with the results from Court.
			No further Triggers are generated (other than the Out of Area Trigger).

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/255" in the PNC
		When message id "q-solution/255" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
