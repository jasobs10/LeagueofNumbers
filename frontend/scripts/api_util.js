import Data from '../data/data';

export const APIUTIL = {

  fetchSummonerById: (id) => {
    return $.ajax({
      method: "GET",
      url: `summoners/${id}`,
      dataType: 'json',
      data: {}

    });
  },

  fetchSummonerByName: (name) => {

    return $.ajax({
      method: "GET",
      url: `summoners`,
      data: { name }

    });
  },

  fetchRandom: () => {
    return $.ajax({
      method: "GET",
      url: `summoners`,
      data: { random: true }

    });
  },

  fetchChallengers: () => {
    return $.getJSON('data/challengers.json', (data) => {
    });
  },

  fetchChallengerMatches: (array, nameArray, rankArray ) => {
    return $.ajax({
      method: "GET",
      url: `challengers`,
      dataType: 'json',
      data: { array, nameArray, rankArray }

    });
  },

  fetchChallengerMatchesJson: () => {
    return $.getJSON('data/matches4.json', (data) => {
    });
  }

};
