import { $host } from "./index";

export const fetchInfo = async () => {
  const { data } = await $host.get("infoShelter");
  return data;
};
