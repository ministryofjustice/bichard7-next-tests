const uploadIncomingMessage = (context) => async (messageId, messageReceivedDate) => {
  const s3FileName = await context.s3.uploadIncomingMessage(messageId, messageReceivedDate);

  if (context.isLocalEnvironment) {
    await context.stepFunctions.runIncomingMessagesStateMachine(s3FileName);
  }
};

module.exports = uploadIncomingMessage;
