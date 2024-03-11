import axios from "axios";

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c21hbiIsImV4cCI6MTcxMDE2NjAyMywiaWF0IjoxNzEwMTQ4MDIzfQ.tb99ck_rb2xvqv9bHul2gyftkpEn6tKv_R_9z6QSMhSpQXPSN1kpR8xEwJRlALI84rquuxC-J7Bhwg-Po2ov-g'

const config = { withCredentials: true };
const headers = {'Authorization':`Bearer ${localStorage.getItem("jwtToken")}`, 'Content-Type':'application/json'}

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
