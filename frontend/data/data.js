import { APIUTIL } from '../scripts/api_util';
import Draw from '../scripts/draw';

class Data {

  constructor() {

    this.challengerList = "";
    this.draw = new Draw();
  }
  fetchChallengers(xArg, yArg) {

      APIUTIL.fetchChallengerMatchesJson().then((r) => {

        this.challengerList = r;
        this.draw.list = this.challengerList;
        this.draw.setAttributes();
        this.draw.addOptions();
        const options = {"x": xArg, "y": yArg};
        this.draw.render(options);

      });
  }


  addPlayerInput() {
    $('.playerinput').submit((e) => {
      e.preventDefault();
      $('#cssload-loader').show();
      const name = $(e.target).find("input").val();
      APIUTIL.fetchSummonerByName(name).then((r) => {
        $('#cssload-loader').hide();
        this.draw.renderPlayer(r);
        this.draw.hideError();

      }, (e) => {
        $('#cssload-loader').hide();
        this.draw.renderError();
      });
    });

    $('#random').click(() => {
      $('#cssload-loader').show();
      APIUTIL.fetchRandom().then((r) => {
        $('#cssload-loader').hide();
        $('#player-text').val(`${r.name}`);
        this.draw.renderPlayer(r);
        this.draw.hideError();
      }, (e) => {
        $('#cssload-loader').hide();
        this.draw.renderError();
      });
    });

  }

}

export default Data;
