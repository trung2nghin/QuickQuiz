import axios from 'axios';

export const requestGetQuestion = async () => {
  const config = {
    method: 'get',
    url: 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple',
  };

  let response = await axios(config);

  return response;
};
