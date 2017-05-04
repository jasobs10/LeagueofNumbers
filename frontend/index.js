import { fetchChallengers } from './scripts/api_util';
import Data from './data/data';

$(() => {
  // let challengersArray;

  let a = new Data();
  let b = a.fetchChallengers().then((r) => {
    debugger
  });

  // debugger;

  // debugger
//
});
