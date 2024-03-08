import axios from "axios";

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c21hbiIsImV4cCI6MTcwOTkyNjI5MSwiaWF0IjoxNzA5OTA4MjkxfQ.0LX1yBxGU_k_oP1rmtO8U3Xo8TlOJtqV275p12PERbSQIQRykoNbSPjDydqJuuIRrweTeP1B4an1gQbPgxt4Tg'

const config = { withCredentials: true };
const headers = {'Authorization':`Bearer ${token}`, 'Content-Type':'application/json'}

export const postData = async (endPoint, data) => {
  try {
    const resp = await axios.post(
      process.env.REACT_APP_SERVER_URL + endPoint,
      data,
      // config,
      {headers: headers}
    );
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putData = async (endPoint, data) => {
  try {
    const resp = await axios.put(
      process.env.REACT_APP_SERVER_URL + endPoint,
      data,
      // config,
      {headers: headers}
    );
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postFormData = async (formData) => {
  try {
    const resp = await axios.post(process.env.REACT_APP_UPLOAD_URL, formData);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getData = async (endPoint) => {
  try {
    const resp = await axios.get(
      process.env.REACT_APP_SERVER_URL + endPoint,
      // config,
      {headers: headers}
    );
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getDataWithParams = async (url, params) => {
  try {
    const resp = await axios.get(process.env.REACT_APP_SERVER_URL + url, {
      ...config,
      params,
    });
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getExternalData = async (endPoint) => {
  try {
    const resp = await axios.get(endPoint);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteData = async (endPoint) => {
  try {
    const resp = await axios.delete(
      process.env.REACT_APP_SERVER_URL + endPoint,
      // config
      {headers: headers}
    );
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postMsgData = async (endPoint, data) => {
  try {
    const resp = await axios.post(endPoint, data);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return error;
  }
};
