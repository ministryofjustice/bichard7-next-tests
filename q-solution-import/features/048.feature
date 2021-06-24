Feature: {048} #189 - DH page updated with sentence postponed DDMMYY

			"""
			{048} #189 - DH page updated with sentence postponed DDMMYY
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Adjournment with Judgement & Judgement with Final Result) and Trigger generation.
			A number of Court Hearing results are sent through the CJSE and onto Bichard7 for the same case which moves progressively from 'Adjournment with Judgement' to 'Sentence'.
			For each set of results a Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			PNC is verified to ensure that no (potentially transient) dates are added to the DH Page whilst the case is still considered Adjourned.
			Pre Update Trigger is also successfully created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 048" in the PNC
		When message id "q-solution/048" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

