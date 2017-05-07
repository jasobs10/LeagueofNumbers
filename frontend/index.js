import { fetchChallengers } from './scripts/api_util';
import { APIUTIL } from './scripts/api_util';
import Data from './data/data';


$(() => {
  // let challengersArray;
  $('.playerinput').submit((e) => {
    e.preventDefault();
    const name = $(e.target).find("input").val();
    // debugger
    APIUTIL.fetchSummonerByName(name).then((r) => {
      
    });
  });

  let a = new Data();
  a.fetchChallengers()



  // debugger;

  // debugger
//
});
