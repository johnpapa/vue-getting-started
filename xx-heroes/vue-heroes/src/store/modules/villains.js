import axios from 'axios';
import API from '../config';
import { parseItem, parseList } from './action-utils';
import {
  ADD_VILLAIN,
  DELETE_VILLAIN,
  GET_VILLAINS,
  UPDATE_VILLAIN,
} from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    villains: [],
  },
  mutations: {
    [ADD_VILLAIN](state, villain) {
      state.villains.unshift(villain); // mutable addition
    },
    [UPDATE_VILLAIN](state, villain) {
      const index = state.villains.findIndex(v => v.id === villain.id);
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
    getVillainsAction({ commit }) {
      return axios
        .get(`${API}/villains`)
        .then(response => {
          const villains = parseList(response);
          commit(GET_VILLAINS, villains);
          return villains;
        })
        .catch(captains.error);
    },
    deleteVillainAction({ commit }, villain) {
      return axios
        .delete(`${API}/villains/${villain.id}`)
        .then(response => {
          const villain = parseItem(response, 200);
          commit(DELETE_VILLAIN, villain);
          return null;
        })
        .catch(captains.error);
    },
    updateVillainAction({ commit }, villain) {
      return axios
        .put(`${API}/villains/${villain.id}`, villain)
        .then(response => {
          const updatedvillain = parseItem(response, 200);
          commit(UPDATE_VILLAIN, updatedvillain);
          return updatedvillain;
        });
    },
    addVillainAction({ commit }, villain) {
      return axios.post(`${API}/villains`, villain).then(response => {
        const addedVillain = parseItem(response, 201);
        commit(ADD_VILLAIN, addedVillain);
        return addedVillain;
      });
    },
  },
  getters: {
    villains: state => state.villains,
  },
};
