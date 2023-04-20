const { Message } = require("../models/modelsORM");
const ApiError = require("../errors/ApiError");
const MessageDTO = require("../models/messageDTO");

class MessageController {
  async add(req, res, next) {
    const {
      messageName,
      phone,
      email,
      messageText,
      preferredContactMethod,
      answerFlag,
      messageId,
    } = req.body;

    try {
      const messageORM = await Message.create({
        messageId,
        messageName,
        phone,
        email,
        messageText,
        preferredContactMethod,
        answerFlag,
      });

      const messageDTO = new MessageDTO(messageORM);
      return res.json(messageDTO);
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async getList(req, res) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 9;
    const offset = page * limit - limit;

    const { count, rows } = await Message.findAndCountAll({ limit, offset });
    const messagesCount = count;
    const messagesORM = rows;
    const messagesDTO = [];
    for (const messageORM of messagesORM) {
      const messageDTO = new MessageDTO(messageORM);
      messagesDTO.push(messageDTO);
    }
    return res.json({ messages: messagesDTO, messagesCount });
  }

  async getById(req, res, next) {
    const { messageId } = req.params;

    const messageORM = await Message.findByPk(messageId);
    if (!messageORM) {
      return next(
        ApiError.badRequest(
          `Message with messageId=${messageId} does not exist`
        )
      );
    }

    try {
      const messageDTO = new MessageDTO(messageORM);
      return res.json(messageDTO);
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async changeAnswerFlagById(req, res, next) {
    const { messageId } = req.params;
    const { answerFlag } = req.body;

    const messageORM = await Message.findByPk(messageId);
    if (messageORM) {
      messageORM.update({ answerFlag });
      const messageDTO = new MessageDTO(messageORM);
      return res.json(messageDTO);
    }

    return next(
      ApiError.badRequest(`Message with messageId=${messageId} does not exist`)
    );
  }
}

module.exports = new MessageController();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: The messages managing API
 * /message:
 *   post:
 *     summary: Send a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: The sent message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 * */
/**
 * @swagger
 * /message:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get messages list
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *         allowReserved: true
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         allowReserved: true
 *         description: The numbers of items to return
 *     responses:
 *       200:
 *         description: The list of messages
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                messagesCount:
 *                  type: integer
 *                  description: The total amount of messages in DB
 *                messages:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Message'
 *                  description: Messages list
 *       401:
 *         description: Header didn't contain authorization token
 *       403:
 *         description: Role of the user doesn't give access for this call
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /message/{messageId}:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get a message by id
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: integer
 *         allowReserved: true
 *         description: The id of message to find
 *     responses:
 *       200:
 *         description: Message with the specified Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       401:
 *         description: Header didn't contain authorization token
 *       403:
 *         description: Role of the user doesn't give access for this call
 *       404:
 *         description: Message with specified id doesn't exist
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /message/{messageId}:
 *   patch:
 *     security:
 *        - bearerAuth: []
 *     summary: Change answered flag of a message by it's id (mark the message answered or not answered)
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  answerFlag:
 *                    type: boolean
 *                    description: The value of answerFlag to set
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: integer
 *         allowReserved: true
 *         description: The id of message to update
 *     responses:
 *       200:
 *         description: Updated message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       401:
 *         description: Header didn't contain authorization token
 *       403:
 *         description: Role of the user doesn't give access for this call
 *       404:
 *         description: Message with specified id doesn't exist
 *       500:
 *         description: Internal server error
 */
