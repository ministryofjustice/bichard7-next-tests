Feature: {033} R3.3_BR7_Sine Die_Add Result Code 3027

			"""
			{033} R3.3_BR7_Sine Die_Add Result Code 3027
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Sine Die and Reinstated Sine Die handling.
			Court Hearing Results are sent through the CJSE and onto Bichard7 containing Offences that are all resulted Sine Die (2007) generating PRE Update Triggers and an Update of the PNC.
			Subsequent Court Hearing Result are sent through the CJSE and onto Bichard7 with Reinstated Sine Die results.
			Some of the Offences include a '3027 Reinstate Adjourned Sine Die' result and some do not.
			In all cases the solution ensures that a 3027 disposal together with the date of the original conviction - as provided in the ADJ segment received in the PNC enquiry - are included in the PNC Update that is generated and updated on PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/033" in the PNC
		When message id "q-solution/033" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
