const uploadIncomingMessage = (context) => async (messageFileName, externalCorrelationId, messageReceivedDate) => {
  const s3FileName = await context.s3.uploadIncomingMessage(messageFileName, externalCorrelationId, messageReceivedDate);

  if (typeof s3FileName !== "string") {
    return false;
  }

  if (context.isLocalWorkspace) {
    const stateMachineResult = await context.stepFunctions.runIncomingMessagesStateMachine(s3FileName);

    if (stateMachineResult) {
      return false;
    }
  }

  return true;
};

module.exports = { uploadIncomingMessage };
