// Abstraction of request methods - fetch will not be final

export const request = async (path, options) => {
  return fetch(path, options);
}

export const getArrayBufferFromResponse = async (response) => {
  return response.arrayBuffer();
}

export const requestArrayBuffer = async (path, options) => {
  try {
    const response = await request(path, options);
    return await getArrayBufferFromResponse(response);
  } catch (error) {
    throw error;
  }
}
