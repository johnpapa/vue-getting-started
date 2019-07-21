import * as axios from 'axios';

import { format } from 'date-fns';
import { inputDateFormat } from './constants';

import { API } from './config';

const getHeroes = async function() {
  // cant just return this, because its not what we want
  // return response.data;
  // but what if there is bad data in the response?
  // let data = response.data;
  // Let's parse it better
  try {
    const response = await axios.get(`${API}/heroes.json`);

    let data = parseList(response);

    const heroes = data.map(h => {
      h.originDate = format(h.originDate, inputDateFormat);
      return h;
    });
    return heroes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getVillains = async function() {
  try {
    const response = await axios.get(`${API}/villains.json`);
    let villains = parseList(response);
    return villains;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getHero = async function(id) {
  const heroes = await getHeroes();
  let hero = heroes.find(h => h.id === id);
  return hero;
};

const getVillain = async function(id) {
  const villains = await getVillains();
  let villain = villains.find(v => v.id === id);
  return villain;
};

const parseList = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export const data = {
  getHeroes,
  getHero,
  getVillains,
  getVillain,
};
