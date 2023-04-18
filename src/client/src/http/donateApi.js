import { $host } from "./index";

export const createDonation = async (donationName, donationSum) => {
  const { data } = await $host.post("donation", { donationName, donationSum });
  return data;
};
