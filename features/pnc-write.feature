Feature: Writing to the PNC
  In order to make sure the system is working
  I want to make sure court results can be writen to the PNC

  Scenario Outline: Writing a court result for record <recordId> to the PNC
    Given there is a valid record for "<recordId>" in the PNC
    When message id "<messageId>" is received
    Then the PNC updates the record

    Examples:
      | recordId     | messageId   |
      | 19860421364M | qsol_custom |
