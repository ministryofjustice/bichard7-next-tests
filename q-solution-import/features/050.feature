Feature: {050} R3.4_BR7_YZ Force Code

			"""
			{050} R3.4_BR7_YZ Force Code
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result), portal resubmission and verification of the 'YZ' Force Code for updates sent from the Bichard7 solution directly to the PNC.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing Judgement and Final Result information.
			Exception is created, displayed and resolved on the Portal via data update and record resubmission.
			PNC Exception Update is generated and the Court Hearing Results with portal-added values (Offence Sequence Numbers) are successfully added onto the PNC.
			PRE and POST Triggers are also successfully created on the Portal.
			Verification is also made of the Bichard7 system logs to ensure that the 'YZ' Force Code is used in the update to the PNC to provide an audit trail of those updates made to PNC by the Bichard7 solution.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/050" in the PNC
		When message id "q-solution/050" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
