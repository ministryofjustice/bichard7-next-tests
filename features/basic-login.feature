Feature: Basic end-to-end test
  In order to make sure the system is working
  I want to make sure the message is displayed in the Bichard UI

  @NextUI
  Scenario: Raising an exception message
    Given there is a valid record for "Rigout Dean" in the PNC
      And a message is received
      And I am logged in as "exceptionhandler"
    When I view the list of exceptions
    Then the exception list should contain a record for "Rigout Dean"
      And the record for "Rigout Dean" should not have any PNC errors
