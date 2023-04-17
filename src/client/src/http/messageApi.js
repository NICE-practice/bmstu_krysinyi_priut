import { $authHost, $host } from "./index";

export const createMessage = async (
  messageName,
  phone,
  email,
  messageText,
  preferredContactMethod,
  answerFlag
) => {
  const { data } = await $host.post("message", {
    messageName,
    phone,
    email,
    messageText,
    preferredContactMethod,
    answerFlag,
  });
  return data;
};

export const updateMessage = async (answerFlag, id) => {
  const { data } = await $authHost.patch("message" + "/" + id, { answerFlag });
  return data;
};

export const fetchMessages = async (page, limit = 15) => {
  const { data } = await $authHost.get("message", {
    params: {
      limit,
      page,
    },
  });
  console.log("mes");
  console.log(data);
  return data;
};
