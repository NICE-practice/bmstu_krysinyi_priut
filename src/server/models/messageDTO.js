class MessageDTO {
  /** @type {number} */
  messageId;

  /** @type {string} */
  messageName;

  /** @type {string} */
  phone;

  /** @type {string} */
  email;

  /** @type {string} */
  messageText;

  /** @type {string} */
  preferredContactMethod;

  /** @type {boolean} */
  answerFlag;

  /**
   * @param {Message|null} messageORM
   */
  constructor(messageORM = null) {
    this.messageId = messageORM?.messageId;
    this.messageName = messageORM?.messageName;
    this.phone = messageORM?.phone;
    this.email = messageORM?.email;
    this.messageText = messageORM?.messageText;
    this.preferredContactMethod = messageORM?.preferredContactMethod;
    this.answerFlag = messageORM?.answerFlag;
  }
}

module.exports = MessageDTO;
