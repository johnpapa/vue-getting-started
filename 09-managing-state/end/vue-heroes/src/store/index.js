import Vue from 'vue';
import Vuex from 'vuex';

import { dataService } from '../shared';
import {
  ADD_HERO,
  DELETE_HERO,
  GET_HEROES,
  UPDATE_HERO,
} from './mutation-types';

// const captains = console;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    heroes: [],
  },
  mutations: {
    [ADD_HERO](state, hero) {
      state.heroes.unshift(hero); // mutable addition
    },
    [UPDATE_HERO](state, hero) {
      const index = state.heroes.findIndex(h => h.id === hero.id);
      state.heroes.splice(index, 1, hero);
      state.heroes = [...state.heroes];
    },
    [GET_HEROES](state, heroes) {
      state.heroes = heroes;
    },
    [DELETE_HERO](state, hero) {
      state.heroes = [...state.heroes.filter(p => p.id !== hero.id)];
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async addHeroAction({ commit }, hero) {
      const addedHero = await dataService.addHero(hero);
      commit(ADD_HERO, addedHero);
    },
    async deleteHeroAction({ commit }, hero) {
      const deletedHeroId = await dataService.deleteHero(hero);
      commit(DELETE_HERO, deletedHeroId);
    },
    async getHeroesAction({ commit }) {
      const heroes = await dataService.getHeroes();
      commit(GET_HEROES, heroes);
      // return axios
      //   .get(`${API}/heroes`)
      //   .then(response => {
      //     const heroes = parseList(response);
      //     commit(GET_HEROES, heroes);
      //     return heroes;
      //   })
      //   .catch(captains.error);
    },
    async updateHeroAction({ commit }, hero) {
      const updatedHero = await dataService.updateHero(hero);
      commit(UPDATE_HERO, updatedHero);

      // return axios.put(`${API}/heroes/${hero.id}`, hero).then(response => {
      //   const updatedHero = parseItem(response, 200);
      //   commit(UPDATE_HERO, updatedHero);
      //   return updatedHero;
      // });
    },
  },
  getters: {
    heroes: state => state.heroes,
    getHeroById: state => id => state.heroes.find(h => h.id === id),
  },
});
