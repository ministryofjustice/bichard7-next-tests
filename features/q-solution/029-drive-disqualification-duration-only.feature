Feature: {029} R5.6_BR7 Driver Disqualification - Duration-only values

			"""
			{029} R5.6_BR7 Driver Disqualification - Duration-only values
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Driver Disqualification handling and automation of results where only a Duration value is received from Court.
			A 1st set of (Adjourment With Judgement) Court Hearing results are sent through the CJSE and onto Bichard7.
			A PNC Update is generated and the results from Court (Interim Disqualification) are successfully and automatically added onto the PNC.
			A PRE Trigger is also successfully created on the Portal.
			A 2nd set of (Sentence) Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The substantive result received (3071 - Disqualified from Driving - Discretionary) contains a Duration value.
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
		And there is a valid record for "q-solution test 029" in the PNC
		When message id "q-solution/029A" is received
		And I view the list of exceptions
		Then there are no exceptions
		And I see trigger "PR01 - Disqualified driver" in the exception list table
		When I open the record for "Duffy Patrick"
		And I click the "Triggers" tab
		Then I see trigger "TRPR0001 - Driver Disqualification - Update DD screen" in the exception list table
		And the PNC updates the record
		When message id "q-solution/029B" is received
		# TODO: Unlock
		And I view the list of exceptions
		Then there are no exceptions
		And I see trigger "PR01 - Disqualified driver" in the exception list table
		When I open the record for "Duffy Patrick"
		And I click the "Triggers" tab
		Then I see trigger "TRPR0001 - Driver Disqualification - Update DD screen" in the exception list table
		And the PNC updates the record

