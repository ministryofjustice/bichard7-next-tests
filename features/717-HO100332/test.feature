Feature: {717} HO100332
      """
      Testing that we can resolve HO100332 exceptions and resubmit to successfully update the PNC

      In this...
      """

  Background:
    Given the data for this test is in the PNC
      And "input-message" is received

  @NextUI
  Scenario: Resolving one pair of HO100310 exceptions
    Given I am logged in as "generalhandler"
      And I view the list of exceptions
    When I wait 3000 seconds
    Then I see exception "HO100332" in the exception list table
