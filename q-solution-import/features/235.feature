Feature: {235} BR7 R5.5.1-PFI Change-PNC Warning Response

			"""
			{235} BR7 R5.5.1-PFI Change-PNC Warning Response
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying PNC Warning Message handling, Result Code Qualifier handling, Electronic Tagging handling and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing Adjournment With Judgement information which also includes 4 x Result Code Qualifiers.
			None of the Result Code Qualifiers are "BA" (Electronic Tagging) but the Result Text from Court does include "to be electronically monitored".
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The solution recognises that this set of results from Court will have to be manually resolved and Exceptions are created for the following reasons:
			- The Offence has too many qualifiers (5, including the BA Qualifier)
			- The combination of Disposals are incompatible with the PNC
			- A PNC Warning is returned from the PNC
			A Pre Update Trigger is also created on the Portal but no update of the PNC is made.

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
