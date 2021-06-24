Feature: {269} BR7 R5.7-RCD464-TRPR0022 Extradition Order

			"""
			{269} BR7 R5.7-RCD464-TRPR0022 Extradition Order
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the Extradition Order business process.
			An Extradition Offence is not recorded on the PNC; it is a Libra Offence only.
			Court Hearing Results are received for an Extradition Order using a 'Dummy' ASN.
			The solution recognises the 'Dummy' ASN and the Non-Recordable Offence and (purposely) ignores the Case.
			A Pre Update Trigger is created to indicate that the Extradition Order has been made.
			No PNC Update is made and the Trigger Handler instead deals with the Case by taking local action to deal with the Extradition Order.
			The Trigger is Marked as Complete once this has been completed.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 269" in the PNC
		When message id "q-solution/269" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

