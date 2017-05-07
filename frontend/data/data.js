import { APIUTIL } from '../scripts/api_util';
import Draw from '../scripts/draw';



class Data {

  constructor() {

    this.challengerList = "";
  }
  fetchChallengers(xArg, yArg) {
    //
    // APIUTIL.fetchChallengers().then((r) => {
    //   const name = [];
    //   const rank = [];
    //   this.challengerPlayers = r;
    //   // const first = r.entries.map((el) => {
    //   //   name.push(el.playerOrTeamName);
    //   //   rank.push(el.leaguePoints);
    //   //   return el.playerOrTeamId;
    //   // });

      // APIUTIL.fetchChallengerMatches().then((r) => console.log(r));
      APIUTIL.fetchChallengerMatchesJson().then((r) => {
        console.log(r.length)
        this.challengerList = r;
        const draw = new Draw(this.challengerList);
        draw.addOptions();
        draw.render(xArg, yArg);
        // APIUTIL.fetchSummonerByName("Just Katarina").then((r) => console.log(r));
      });
    // });
  }



}

export default Data;
