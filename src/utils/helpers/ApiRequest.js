import axios from 'axios';
import constants from './constants';


export async function getApi(url, header) {
  return await axios.get(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      'x-access-token': header.accesstoken,
      Authorization: `Bearer ${header.accesstoken ?? ''}`,
    },
  });
}

export async function getApiWithParam(url, param, header) {
  return await axios({
    method: 'GET',
    baseURL: constants.BASE_URL,
    url: url,
    params: param,
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
      'x-access-token': header.accesstoken,
    },
  });
}

export async function postApi(url, payload, header) {
  return await axios.post(`${constants.BASE_URL}/${url}`, payload, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      'x-access-token': header.accesstoken,
      Authorization: `Bearer ${header.accesstoken ?? ''}`,
    },
  });
}
