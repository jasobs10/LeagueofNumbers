import { APIUTIL } from '../scripts/api_util';
import Draw from '../scripts/draw';



class Data {

  constructor() {

    this.challengerList = "";
    this.draw = new Draw();
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
        // console.log(r.length)
        this.challengerList = r;

        this.draw.list = this.challengerList;
        this.draw.setAttributes();
        this.draw.addOptions();
        this.draw.render(xArg, yArg);

      });
  }


  addPlayerInput() {
    $('.playerinput').submit((e) => {
      e.preventDefault();
      const name = $(e.target).find("input").val();
      // debugger
      APIUTIL.fetchSummonerByName(name).then((r) => {
        this.draw.renderPlayer(r);

      });
    });

  }

}

export default Data;
