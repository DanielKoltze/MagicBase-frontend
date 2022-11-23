const BASE_URL = "http://localhost:8080/api";

const makeRequest = async (url, settings) => {
  const response = await fetch(url, settings);
  const data = await response.json();
  return data;
};
