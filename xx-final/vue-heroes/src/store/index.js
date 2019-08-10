import Vue from 'vue';
import Vuex from 'vuex';

import { dataService } from '../shared';
import {
  ADD_HERO,
  DELETE_HERO,
  GET_HEROES,
  UPDATE_HERO,
  ADD_VILLAIN,
  DELETE_VILLAIN,
  GET_VILLAINS,
  UPDATE_VILLAIN,
} from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    heroes: [],
    villains: [],
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
    [ADD_VILLAIN](state, villain) {
      state.villains.unshift(villain); // mutable addition
    },
    [UPDATE_VILLAIN](state, villain) {
      const index = state.villains.findIndex(h => h.id === villain.id);
      state.villains.splice(index, 1, villain);
      state.villains = [...state.villains];
    },
    [GET_VILLAINS](state, villains) {
      state.villains = villains;
    },
    [DELETE_VILLAIN](state, villain) {
      state.villains = [...state.villains.filter(p => p.id !== villain.id)];
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
    },
    async updateHeroAction({ commit }, hero) {
      const updatedHero = await dataService.updateHero(hero);
      commit(UPDATE_HERO, updatedHero);
    },
    async addVillainAction({ commit }, villain) {
      const addedVillain = await dataService.addVillain(villain);
      commit(ADD_VILLAIN, addedVillain);
    },
    async deleteVillainAction({ commit }, villain) {
      const deletedVillainId = await dataService.deleteVillain(villain);
      commit(DELETE_VILLAIN, deletedVillainId);
    },
    async getVillainsAction({ commit }) {
      const villains = await dataService.getVillains();
      commit(GET_VILLAINS, villains);
    },
    async updateVillainAction({ commit }, villain) {
      const updatedVillain = await dataService.updateVillain(villain);
      commit(UPDATE_VILLAIN, updatedVillain);
    },
  },
  getters: {
    heroes: state => state.heroes,
    getHeroById: state => id => state.heroes.find(h => h.id === id),
    villains: state => state.villains,
    getVillainById: state => id => state.villains.find(v => v.id === id),
  },
});
