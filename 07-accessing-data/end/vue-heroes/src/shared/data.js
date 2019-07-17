import * as axios from 'axios';

import { format } from 'date-fns';
import { inputDateFormat } from './constants';

import { API } from './config';

const getHeroes = async function() {
  try {
    const response = await axios.get(`${API}/heroes.json`);
    // cant just return this, because its not what we want
    // return response.data;
    // but what if there is bad data in the response?
    // let data = response.data;
    // Let's parse it better
    let data = parseList(response);
    const heroes = data.map(h => {
      h.originDate = format(h.originDate, inputDateFormat);
      return h;
    });
    return heroes;
  } catch (error) {
    console.error(error); // customize how you catch errors
    return [];
  }
};

export const data = {
  getHeroes,
};

const parseList = response => {
  if (response.status !== 200) throw Error(response.message);
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

// const parseItem = (response, code) => {
//   if (response.status !== code) throw Error(response.message);
//   let item = response.data;
//   if (typeof item !== 'object') {
//     item = undefined;
//   }
//   return item;
// };
