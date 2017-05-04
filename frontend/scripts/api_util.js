import Data from '../data/data';

export const APIUTIL = {

  fetchSummonerById: (id) => {
    return $.ajax({
      method: "GET",
      // url: `https://na1.api.riotgames.com/lol/summoner/v3/summoners/${id}?api_key=${key}`,
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

  fetchChallengers: () => {
    return $.getJSON('data/challengers.json', (data) => {
      // console.log(data);
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
      // console.log(data);
    });
  }

};
