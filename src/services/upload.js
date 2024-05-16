import { baseUrl, tokenKey } from "../constants";

export async function uploadCSVFile() {
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(baseUrl + "/upload", options);
  if (response.satus === 401) {
    window.localStorage.removeItem(tokenKey);
    window.location.assign(window.location);
    return;
  }

  if (response.ok) {
    return response.json();
  } else {
    const body = await response.json();
    const error =
      body.errors instanceof Array ? body.errors.join(", ") : body.errors;
    return Promise.reject(new Error(error));
  }
}
