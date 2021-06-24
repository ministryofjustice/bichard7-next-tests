Feature: {304} BR7-R5.9-RCD608-Multi CCR-Identified Offence Matches across CCR Groups-Identified Single Match on Adjudication

			"""
			{304} BR7-R5.9-RCD608-Multi CCR-Identified Offence Matches across CCR Groups-Identified Single Match on Adjudication
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying multiple CCR Group and Offence Matching where Multiple CCR Groups are present, each CCR Group containing the same set of identical Offences.
			A 1st set of Court Hearing Results are received from Court containing Final Results for the Offences in the 1st CCR Group.
			The contents of the 1st CCR Group are successfully updated on the PNC with the Results received from Court.
			A 2nd set of Court Hearing Results are received from Court containing Final Results for the Offences in the 2nd CCR Group.
			No Exception is generated since the Bichard7 solution correctly matches the Offences and Results from Court with the Offences on the PNC that have yet to be resulted.
			The contents of the 2nd CCR Group are successfully updated on the PNC with the Results received from Court.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 304" in the PNC
		When message id "q-solution/304" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

