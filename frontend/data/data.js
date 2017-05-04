import { APIUTIL } from '../scripts/api_util';

class Data {

  constructor() {
    this.challengerPlayers = "";
    this.challengerList = "";
  }
  fetchChallengers() {

    APIUTIL.fetchChallengers().then((r) => {
      const name = [];
      const rank = [];
      this.challengerPlayers = r;
      // const first = r.entries.map((el) => {
      //   name.push(el.playerOrTeamName);
      //   rank.push(el.leaguePoints);
      //   return el.playerOrTeamId;
      // });

      // APIUTIL.fetchChallengerMatches(first, name).then((r) => console.log(r));
      APIUTIL.fetchChallengerMatchesJson().then((r) => {
        this.challengerList = r;
        // debugger
      });
    });
  }



}

export default Data;
