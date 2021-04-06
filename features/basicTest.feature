Feature: Basic end-to-end test
  In order to make sure the system is working
  I want to make sure the message is displayed in the Bichard UI

  Scenario: Raising an exception message
    Given I am logged into the Bichard UI as an exception handler
    And a message is received
    When I view the list of exceptions
    Then the exception list should contain "Rigout Dean"
    And the record should not have any PNC errors
