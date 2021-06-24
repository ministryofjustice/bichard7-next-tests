Feature: {217} BR7 R5.4-RCD517-TRPR0003 conditions-Youth Rehabilitation Orders

			"""
			{217} BR7 R5.4-RCD517-TRPR0003 conditions-Youth Rehabilitation Orders
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Hearing Results automation, Youth Rehabilitation Orders and Curfew Requirement handling.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The PNC is successfully updated to reflect the results from Court and the solution ensures that only the Duration value of the Curfew Requirement is added to the PNC.
			The solution also generates a number of "Order Issues" Triggers based on the Results received from Court (i.e.
			the combination of a "Youth Rehabilitation Order" Result and a specific "Requirement" Result is received for an Offence).

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 217" in the PNC
		When message id "q-solution/217" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

