const BASE_URL = "https://magicbase.azurewebsites.net/api";

const makeRequest = async (url, settings) => {
  const response = await fetch(url, settings);
  const data = await response.json();
  return data;
};