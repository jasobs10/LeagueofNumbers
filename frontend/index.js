import { fetchChallengers } from './scripts/api_util';
import { APIUTIL } from './scripts/api_util';
import Data from './data/data';


$(() => {
  $('.tip-box').hide();
  // let challengersArray;
  $('.question').mouseover(() => $('.tip-box').show());
  $('.question').mouseout(() => $('.tip-box').hide());

  let a = new Data();
  a.addPlayerInput();
  a.fetchChallengers();



  // debugger;

  // debugger
//
});
