/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - messageName
 *         - phone
 *         - email
 *         - messageText
 *         - preferredContactMethod
 *         - answerFlag
 *       properties:
 *         messageId:
 *           type: integer
 *           description: Id of the message
 *         messageName:
 *           type: string
 *           description: Message author's name
 *         phone:
 *           type: string
 *           description: Message author's phone
 *         email:
 *           type: string
 *           description: Message author's email
 *         messageText:
 *           type: string
 *           description: Message contets
 *         preferredContactMethod:
 *           type: string
 *           description: Weather the author wants to get a call back or to get a message on email
 *         answerFlag:
 *           type: boolean
 *           description: Weather the an answer to the message was already sent or not
 */

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
