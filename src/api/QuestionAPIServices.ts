import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://opentdb.com/',
});

export const requestGetQuestion = async () => {
  const config = {
    method: 'get',
    url: '/api.php?amount=10&category=18&difficulty=easy&type=multiple',
  };

  let response = await instance(config);

  return response;
};

export const requestGetMediumQuestion = async () => {
  const config = {
    method: 'get',
    url: '/api.php?amount=10&category=18&difficulty=medium&type=multiple',
  };

  let response = await instance(config);

  return response;
};

export const requestGetHardQuestion = async () => {
  const config = {
    method: 'get',
    url: '/api.php?amount=10&category=18&difficulty=hard&type=multiple',
  };

  let response = await instance(config);

  return response;
};
