import * as axios from 'axios';

import { format } from 'date-fns';
import { inputDateFormat } from './constants';

import { API } from './config';

const getHeroes = async function() {
  try {
    const response = await axios.get(`${API}/heroes`);

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
    const response = await axios.get(`${API}/villains`);
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

const updateHero = async function(hero) {
  try {
    const response = await axios.put(`${API}/heroes/${hero.id}`, hero);
    const updatedHero = parseItem(response, 200);
    return updatedHero;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateVillain = async function(villain) {
  try {
    const response = await axios.put(`${API}/villains/${villain.id}`, villain);
    const updatedVillain = parseItem(response, 200);
    return updatedVillain;
  } catch (error) {
    console.error(error);
    return null;
  }
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

export const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item;
};

export const dataService = {
  getHeroes,
  getHero,
  updateHero,
  getVillains,
  getVillain,
  updateVillain,
};
