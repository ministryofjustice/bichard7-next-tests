Feature: {028} R5.6_BR7 Driver Disqualification - Duration and Date values

			"""
			{028} R5.6_BR7 Driver Disqualification - Duration and Date values
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Driver Disqualification handling and automation of results where Date and Duration values are received from Court.
			A 1st set of (Adjourment With Judgement) Court Hearing results are sent through the CJSE and onto Bichard7.
			A PNC Update is generated and the results from Court (Interim Disqualification) are successfully and automatically added onto the PNC.
			A PRE Trigger is also successfully created on the Portal.
			A 2nd set of (Sentence) Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The substantive result received (3070 - Disqualified from Driving - Obligatory) contains Duration and (Start) Date values.
			In addition an ancillary result (3050 - Disqualification from Driving Reduced if Course Completed) is also received.
			A PNC Update is generated and the results from Court are successfully and automatically added onto the PNC.
			A PRE Trigger is also successfully created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "supervisor"
		And there is a valid record for "q-solution test 028" in the PNC
		When message id "q-solution/028A" is received
		And I view the list of exceptions
		# Then there are no exceptions
		When I open the record for "Jimbobjones Bobby"
		And I click the "Triggers" tab
		Then I see trigger "TRPR0001" for offence "1"
		# And the PNC updates the record
		When message id "q-solution/028B" is received
		And I click the "Return To List (Unlock)" button
		And I view the list of exceptions
	    # Then there are no exceptions
		When I open the record for "Jimbobjones Bobby"
		And I click the "Triggers" tab
		Then I see trigger "TRPR0001" for offence "1"
		# And the PNC updates the record




