Feature: {139} BR7 R5.2-RCD456-Bail Conditions 200 Char

			"""
			{139} BR7 R5.2-RCD456-Bail Conditions 200 Char
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Bail Condition handling and Results (Adjournment Pre Judgement) automation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The solution recognises that Bail Conditions are present in the Results from Court and ensures where a Bail Condition exceeds 200x characters in length that an additional Bail Condition is created to handle the 'overflow'.
			In addition the Bail Conditions received contain an invalid character (a carriage return) and the solution ensures this is converted into a character acceptable to the PNC.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Verification is made of the Bail Conditions update to the PNC.
			Pre Update Triggers are also generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/139" in the PNC
		When message id "q-solution/139" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
