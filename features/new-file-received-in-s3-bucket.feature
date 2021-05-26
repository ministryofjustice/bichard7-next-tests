Feature: New file received in S3 bucket
  In order to make sure that Bichard and Audit logging are working
  I want to make sure that messages received in S3 bucket are sent to Bichard and Bichard sends events to Audit logging

  Scenario Outline: Recording "PNC Response received" event when PNC responds
    Given there is a valid record for <recordId> in the PNC
    When <messageId> is uploaded to S3 bucket
    Then Audit logging records "Message Sent to Bichard" event against the message
    And Bichard sends "PNC Response received" event to Audit logging

    Examples:
      | recordId      | messageId                   |
      | 19860421364M  | qsol_custom_correlation_id  |
