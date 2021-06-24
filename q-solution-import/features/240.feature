Feature: {240} BR7 R5.6-RCD555-SUBVAR & NEWREM Sine Die- Adj With Judg-Adj Post Judg

			"""
			{240} BR7 R5.6-RCD555-SUBVAR & NEWREM Sine Die- Adj With Judg-Adj Post Judg
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Sine Die Handling where 'Adjournment With Judgement', 'Adjournment Post Judgement' and 'Sentence' results are separately received from Court.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			DISARR PNC Update is generated and the PNC is updated successfully with Adjourned Sine Die details (Judgement With Final Result).
			A 2nd set of results is received from Court Adjourning the Hearing.
			SUBVAR and NEWREM PNC Updates are generated and the PNC is updated successfully with the Adjournment With Judgement results.
			A 3rd set of results is received from Court Adjourning the Hearing again.
			SUBVAR and NEWREM PNC Updates are generated and the PNC is updated successfully with the Adjournment Post Judgement results.
			A 4th set of results is received from Court containing details of the Sentence.
			SUBVAR PNC Update is generated and the PNC is updated successfully with the Sentence results.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 240" in the PNC
		When message id "q-solution/240" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

