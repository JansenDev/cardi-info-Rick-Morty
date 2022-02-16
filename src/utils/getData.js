const API = process.env.API;
const random_character = Math.floor(Math.random() * (400 - 1) + 1);

const getData = async (id) => {
  const apiURl = id ? `${API}${id}` : `${API}/${random_character}`;
  console.log(apiURl);
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data
  } catch (error) {
    console.log("Fetch Error", error);
  }
};
export default getData;
