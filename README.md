# League of Numbers

League of Numbers is a tool to visualize statistics of the top 200 players of the 2017 season, and user inputted players.

[League of Numbers Live](https://www.leagueofnumbers.us/)


## Technologies & APIs
* JavaScript
* D3.js
* jQuery
* Riot Games API
* Ruby
* Ruby on Rails


## Features

### Data

Data for the top ranked players is prefetched through multiple calls to the Riot Games API. Statistics for each top ranked player is aggregated on the Rails backend and written to a JSON file. Users can input a player name into the input box, and data for that specific player will be returned, aggregated and rendered.

```ruby
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

```

Because the Riot Games API does not allow for front-end AJAX request, API requests are handled by the `SummonersController` and `ChallengersController` on the Rails backend. AJAX requests are called to the respective controller, which returns the data from the HTTP request.



### Visualization

The chart is an SVG element, with data points being rendered as circles onto it by D3.js. A dropdown select box allows users to select what statistics the X and Y axis will represent.

![select]

Circle size represents the rank of the player. Data is prefetched which allows instant rendering of different datasets. Each circle has an on-hover effect which renders 3 pie charts displaying a combination of player-specific statistics.

![pie]

The Auto Axis feature keeps either the X or Y axis dataset static, while the opposite axis will cycle through each dataset available to that axis.

```javascript
const loop = axis;
const size = loopAxis.size();
let i = 0;
this.interval = setInterval(() => {
  if (loopAxis[i % size].value !== "-- select data --") {
    if (loop === "X") {
      $('.y-button').off();
      options.x = loopAxis[i % size].value;
    } else {
      $('.x-button').off();
      options.y = loopAxis[i % size].value;
    }

    options.transition = 600;
    this.update(options);
}
  i++;

}, 750);

```

![autoaxis]

Users can input a player name, which will make an AJAX request to the Rails backend, which in turn will fetch multiple datasets from the Riot API, then aggregate the statistics and write aggregated data to a JSON file.

![userinput]

## Future Directions

### 1v1 Simulation

Allow users to select any 2 players from the chart, and will use my created algorithm to predict the winner of a 1v1. Will show updates in real time.

### Time Data

Render a chart which represents time data.

### Live Data

Since I am limited to a certain number of API requests, it is difficult to aggregate statistics for a large dataset. I want to incorporate a script that will make frequent requests, with which I will be able to aggregate more statistics.

[select]: ./docs/screens/dropdown-demo.gif
[pie]: ./docs/screens/hoverpie.png
[autoaxis]: ./docs/screens/autoaxis-demo.gif
[userinput]: ./docs/screens/playerinput-demo.gif
