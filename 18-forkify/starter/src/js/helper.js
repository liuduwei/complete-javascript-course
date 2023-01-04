import { API_URL, TIMEOUT_SEC } from './config';
export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const req = await Promise.race([
      fetch(url),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await req.json();
    if (!req.ok) throw new Error(`${data.message}: (${req.status})`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getSearch = async function(query) {
  try {
    const req = await Promise.race([
      fetch(`${API_URL}?search=${query}`),
      timeout(TIMEOUT_SEC),
    ]);
    // const req = await fetch(`${url}/${id}`);
    const data = await req.json();
    if (!req.ok) throw new Error(`${data.message}: (${req.status})`);
    return data;
  } catch (e) {
    throw e;
  }
}
