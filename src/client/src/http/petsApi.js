import { $authHost, $host } from "./index";

export const createPet = async (
  animalType,
  animalName,
  animalSex,
  animalAge,
  animalHistory,
  animalBreed,
  animalImg,
  deleteFlag,
  vaccinationsList
) => {
  const { data } = await $authHost.post("animal", {
    animalType,
    animalName,
    animalSex,
    animalAge,
    animalHistory,
    animalBreed,
    animalImg,
    deleteFlag,
    vaccinationsList,
  });
  return data;
};

export const updatePet = async (
  animalType,
  animalName,
  animalSex,
  animalAge,
  animalHistory,
  animalBreed,
  animalImg,
  deleteFlag,
  vaccinationsList,
  id
) => {
  const { data } = await $authHost.put("animal" + "/" + id, {
    animalType,
    animalName,
    animalSex,
    animalAge,
    animalHistory,
    animalBreed,
    animalImg,
    deleteFlag,
    vaccinationsList,
  });
  return data;
};

export const deletePet = async (id) => {
  const { data } = await $authHost.delete("animal" + "/" + id);
  return data;
};

export const fetchPets = async (
  animalBreed,
  animalType,
  animalAge,
  page,
  limit = 15,
  animalName,
  onlyNotDeleted = true
) => {
  const { data } = await $host.get("animal", {
    params: {
      animalBreed,
      animalType,
      animalAge,
      limit,
      page,
      animalName,
      onlyNotDeleted,
    },
  });
  console.log(data);
  return data;
};
