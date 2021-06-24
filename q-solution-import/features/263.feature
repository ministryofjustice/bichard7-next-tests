Feature: {263} BR7 R5.7-RCD601-Result Code 2065 received after Defendant found Guilty

			"""
			{263} BR7 R5.7-RCD601-Result Code 2065 received after Defendant found Guilty
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Result Class calculation (Adjournment With Judgement & Judgement With Final Result) and Trigger generation.
			A 1st set of (Adjournment with Judgement) Court Hearing results are sent through the CJSE and onto Bichard7.
			A PNC Update is generated and the results from Court (Adjournment With Judgment) are successfully and automatically added onto the PNC.
			A 2nd set of (Final Result - Result Code '2065' - Defendant Dead) Court Hearing results are sent through the CJSE and onto Bichard7.
			The solution recognises that this is a Final Result and calculates the Result Class as Judgment With Final Result.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			A Pre Update Trigger is also successfully created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 263" in the PNC
		When message id "q-solution/263" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

