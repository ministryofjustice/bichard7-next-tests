Feature: Basic end-to-end test
  In order to make sure the system is working
  I want to make sure the message is displayed in the Bichard UI

  @NextUI
  Scenario: Log in to Bichard and view a case
    Given there is a valid record for "Rigout Dean" in the PNC
      And a message is received
      And I am logged in as "triggerhandler"
    When I view the list of exceptions
    Then the exception list should contain a record for "Rigout Dean"
    When I open the record for "Rigout Dean"
      And I click the "Triggers" tab
    Then I see trigger "TRPR0010"
