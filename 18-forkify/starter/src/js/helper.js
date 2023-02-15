import { API_URL, TIMEOUT_SEC } from './config';

export const timeout = s =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });

export const getJson = async url => {
  try {
    const req = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await req.json();
    if (!req.ok) throw new Error(`${data.message}: (${req.status})`);
    return data;
  } catch (e) {
    console.log('error in get Json');
    throw e;
  }
};

export const getSearch = async query => {
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
    console.log('error in get Json');
    throw e;
  }
};

export const sendJson = async (url, uploadData) => {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const req = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await req.json();
    if (!req.ok) throw new Error(`${data.message}: (${req.status})`);
    return data;
  } catch (e) {
    console.log('error in sendJson');
    throw e;
  }
};
