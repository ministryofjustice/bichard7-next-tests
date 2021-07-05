Feature: {142} BR7 R5.2-RCD423-Trigger Reallocation

      """
      {142} BR7 R5.2-RCD423-Trigger Reallocation
      ===============
      Q-Solution Definition:
      A Bichard7 Regression Test verifying Trigger Reallocation where the Force Owner for a Case changes.
      Court Hearing results are received with an invalid ASN and the Force Owner is derived through the PTIURN.
      The Case creates an Exception and Pre Update Triggers. Ownership/visibility of this Case is then verified by logging in as Users belonging to Forces that SHOULD NOT and SHOULD be able to view the Exception/Trigger Records.
      Some Triggers are Completed, the invalid Arrest Summons Number is corrected and the Case resubmitted from the Portal.
      The query with the PNC finds a match and the Force Owner value is derived from information on the PNC.
      This results in a Force Owner change and therefore any unresolved Triggers are deleted and regenerated according to the new Force's rules.
      Ownership/visibility of this Case is then verified by logging in as Users belonging to Forces that SHOULD NOT and SHOULD be able to view the Exception/Trigger Records."

      MadeTech Definition:

      """

  @Must
  @NeedsValidating
  @NeedsRunningAgainstPNC
  Scenario: PNC is updated when there are multiple CCR and overlapping offences
    Given I am logged in as a "general handler"
    And there is a valid record for "q-solution/142" in the PNC
    When message id "q-solution/142" is received
    And I view the list of exceptions
    And pending
