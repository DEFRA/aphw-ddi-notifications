const { GENERIC_ERROR, VERIFY_EMAIL, USER_FEEDBACK, USER_INVITE, REPORT_SOMETHING, FORM2_SUBMISSION_TO_DEFRA, FORM2_CONFIRMATION_TO_POLICE, EMAIL_APPLICATION_PACK, POST_APPLICATION_PACK, WITHDRAWAL_CONFIRMATION, EMAIL_FIRST_CERTIFICATE, EMAIL_REPLACEMENT_CERTIFICATE } = require('../../../constants/notification-types')

const getNotificationType = type => {
  if (type.endsWith(GENERIC_ERROR)) { return GENERIC_ERROR }
  if (type.endsWith(VERIFY_EMAIL)) { return VERIFY_EMAIL }
  if (type.endsWith(USER_FEEDBACK)) { return USER_FEEDBACK }
  if (type.endsWith(USER_INVITE)) { return USER_INVITE }
  if (type.endsWith(REPORT_SOMETHING)) { return REPORT_SOMETHING }
  if (type.endsWith(FORM2_SUBMISSION_TO_DEFRA)) { return FORM2_SUBMISSION_TO_DEFRA }
  if (type.endsWith(FORM2_CONFIRMATION_TO_POLICE)) { return FORM2_CONFIRMATION_TO_POLICE }
  if (type.endsWith(EMAIL_APPLICATION_PACK)) { return EMAIL_APPLICATION_PACK }
  if (type.endsWith(POST_APPLICATION_PACK)) { return POST_APPLICATION_PACK }
  if (type.endsWith(WITHDRAWAL_CONFIRMATION)) { return WITHDRAWAL_CONFIRMATION }
  if (type.endsWith(EMAIL_FIRST_CERTIFICATE)) { return EMAIL_FIRST_CERTIFICATE }
  if (type.endsWith(EMAIL_REPLACEMENT_CERTIFICATE)) { return EMAIL_REPLACEMENT_CERTIFICATE }

  throw new Error(`Unknown notification type: ${type}`)
}

module.exports = {
  getNotificationType
}
