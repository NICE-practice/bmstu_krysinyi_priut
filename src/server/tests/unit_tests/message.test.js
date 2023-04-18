const supertest = require("supertest");

process.env.PORT = 5006;

const { app, sequelize } = require("../../index");

const api = supertest(app);

const { initUsersWithTokens } = require("./tokens_for_tests");
const { message1, message2 } = require("./data_for_tests");

const { Message } = require("../../models/modelsORM");

describe("Message API ", () => {
  beforeEach(async () => {
    await sequelize.truncate({ cascade: true });
    await Message.create(message1);
    await Message.create(message2);
  });

  test("GET list message: ok", async () => {
    const { operatorToken } = await initUsersWithTokens();

    const messages = await api
      .get("/api/message")
      .set({ authorization: operatorToken })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(messages.body.messages).toHaveLength(2);
    expect(messages.body.messagesCount).toEqual(2);
  });

  test("GET list message: fail (forbidden)", async () => {
    const { contentManagerToken } = await initUsersWithTokens();

    await api
      .get("/api/message")
      .set({ authorization: contentManagerToken })
      .expect(403);
  });
  test("GET message by ID: ok", async () => {
    const { operatorToken } = await initUsersWithTokens();

    const message = await api
      .get(`/api/message/${message1.messageId}`)
      .set({ authorization: operatorToken })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(message.body.messageId).toEqual(message1.messageId);
  });

  test("GET message by ID: fail (unauthorized)", async () => {
    await api.get(`/api/message/${message1.messageId}`).expect(401);
  });

  test("POST message: ok", async () => {
    const newMessage = {
      messageName: "newmessageName",
      phone: "newphone",
      email: "newemail",
      messageText: "newmessageText",
      preferredContactMethod: "newpreferredContactMethod",
      answerFlag: true,
    };

    await api.post("/api/message").send(newMessage).expect(200);

    const messages = await Message.findAll();
    expect(messages[messages.length - 1].messageName).toBe(
      newMessage.messageName
    );
  });

  test("PATCH message (change answered flag): ok", async () => {
    const { operatorToken } = await initUsersWithTokens();

    const updatedMessage = message1;
    updatedMessage.answerFlag = !updatedMessage.answerFlag;
    const { answerFlag } = updatedMessage;

    await api
      .patch(`/api/message/${message1.messageId}`)
      .set({ authorization: operatorToken })
      .send({ answerFlag })
      .expect(200);

    const currentMessage = await Message.findByPk(message1.messageId);
    expect(currentMessage.answerFlag).toEqual(updatedMessage.answerFlag);
  });

  test("PATCH message (change answered flag): fail (unauthorized)", async () => {
    await api
      .patch(`/api/message/${message1.messageId}`)
      .send({ answerFlag: false })
      .expect(401);
  });

  test("PATCH message (change answered flag): fail (no such message)", async () => {
    const { operatorToken } = await initUsersWithTokens();

    await api
      .patch(`/api/message/421`)
      .set({ authorization: operatorToken })
      .send({ answerFlag: false })
      .expect(404);
  });
});
