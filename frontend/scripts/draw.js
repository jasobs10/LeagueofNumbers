import {labels} from './helper';

class Draw {
  constructor() {

    this.list = "";
    this.highlighted = [];
  }

  setAttributes() {
    this.list.forEach((el) => {
      el.color = '#' + Math.floor(Math.random()*16777215).toString(16);
      this.setAverages(el);
    });

    this.list.sort((a, b) => (b.rank - a.rank)).forEach((player, i) => {
      player.ranking = i+1;
    });
    // debugger
  }

  setAverages(player) {
    const minutes = player.stats.maxTimePlayed;
    player.stats.maxTimePlayed = (minutes / 60).toFixed(2);
    player.stats.kda = ((player.stats.totalChampionKills + player.stats.totalAssists) / player.stats.totalDeathsPerSession).toFixed(2);
    player.stats.avgDamageDealt = (player.stats.totalDamageDealt / player.stats.totalSessionsPlayed).toFixed(2);
    player.stats.avgMinionKills = (player.stats.totalMinionKills / player.stats.totalSessionsPlayed).toFixed(2);
    player.stats.avgDamageTaken = (player.stats.totalDamageTaken / player.stats.totalSessionsPlayed).toFixed(2);
    player.stats.avgDeaths = (player.stats.totalDeathsPerSession / player.stats.totalSessionsPlayed).toFixed(2);
    player.stats.avgGoldEarned = (player.stats.totalGoldEarned / player.stats.totalSessionsPlayed).toFixed(2);
    player.stats.avgKills = (player.stats.totalChampionKills / player.stats.totalSessionsPlayed).toFixed(2);
    player.stats.avgAssists = (player.stats.totalAssists / player.stats.totalSessionsPlayed).toFixed(2);
    player.stats.avgMagicDamage = (player.stats.totalMagicDamageDealt / player.stats.totalSessionsPlayed).toFixed(2);
    player.stats.avgPhysicalDamage = (player.stats.totalPhysicalDamageDealt / player.stats.totalSessionsPlayed).toFixed(2);



  }

  addOptions(x, y) {

    const $x = $('#x-axis');
    const $y = $('#y-axis');
    $x.append("<option disabled selected> -- select data -- </option>");
    $y.append("<option disabled selected> -- select data -- </option>");
    Object.keys(labels).forEach((el) => {
      if (el !== "name") {
        $x.append(`<option value=${el}>${labels[el]}</option>`);
        $y.append(`<option value=${el}>${labels[el]}</option>`);
      }
    });
    $x.change((e) => {

    });

    $('.dropdowns').submit((e) => {
      e.preventDefault();
      const xAx = $x.find(":selected").val();
      const yAx = $y.find(":selected").val();
      const options = {"x": xAx, "y": yAx};
      this.render(options);
    });

    $('button').click(this.handleClick.bind(this));
  }

  handleClick(e) {
    if (e.target.innerText === "STOP") {
      // debugger
      e.currentTarget.classList.remove("stop");
      e.currentTarget.innerText = (e.target.className === "submit x-button") ? "X" : "Y";
      clearInterval(this.interval);
    } else {
      this.autoAxis(e.target.innerText);
    }
  }

  renderPlayer(player) {
    this.setAverages(player);
    this.list.push(player);

    const xAx = $("#x-axis").find(":selected").val();
    const yAx = $("#y-axis").find(":selected").val();
    const options = {"x": xAx, "y": yAx};
    this.render(options);

  }

  autoAxis(axis) {
    let options = {};
    let loopAxis;
    let staticAxis;
    // debugger
    if (axis === "X") {
      // debugger
      loopAxis = $('#x-axis').children();
      staticAxis = $('#y-axis').find(":selected").val();
      // options.x = loopAxis;
      options.y = staticAxis;
      $('.x-button').html("STOP").addClass("stop");
    } else if (axis === "Y") {

      loopAxis = $('#y-axis').children();
      staticAxis = $('#x-axis').find(":selected").val();
      options.x = staticAxis;
      // options.y = loopAxis;
      $('.y-button').html("STOP").addClass("stop");
    }
    const loop = axis;
    const size = loopAxis.size();
    let i = 0;
    this.interval = setInterval(() => {
      // if (i < size) {
        // debugger
      if (loopAxis[i % size].value !== "-- select data --") {
        if (loop === "X") {
          options.x = loopAxis[i % size].value;

        } else {

          options.y = loopAxis[i % size].value;

        }

        this.render(options);
      }
        i += 1;
      // } else {
      //   clearInterval(interval);
      // }
    }, 250);

  }

  renderPie(data) {
    // var data2 = [10, 20, 100];

    var width = 160,
        height = 160,
        radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888"]);

    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.value; });
    // d3.select(".piesvg").remove();
    var svg = d3.select(".tooltip-chart").append("svg")
        .attr("class", "piesvg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.value); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", "0em")
          .attr("class", "pietext")
          .text(function(d) {
            // debugger
            return (d.data.label);
          });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", "1.2em")
          .attr("class", "pietext")
          .text((d) => `(${d.data.value})`);

  }



  render(options = {}) {
    let xKey;
    let yKey;
    // debugger
    if (options.x && options.y) {
      xKey = options.x;
      yKey = options.y;
    } else {
      xKey = "maxTimePlayed";
      yKey = "totalChampionKills";
    }

    $(`#x-axis option[value=${xKey}]`).prop('selected', true);
    $(`#y-axis option[value=${yKey}]`).prop('selected', true);

    // add a function to calculate the data i need.  For kda, do if xKey or yKey === kda, then change it
    const margin = {top: 30, right: 20, bottom: 30, left: 65},
    width = 800 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    d3.select("svg").remove();

    const svg = d3.select(".chart-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.select(".tooltip").remove();
    const tooltip = d3.select(".chart-container").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    tooltip.append("div")
        .attr("class", "tooltip-header");

    tooltip.append("div")
        .attr("class", "tooltip-chart");



    // tooltip.append("h1");
    // tooltip.append("article");
    // tooltip.append("article");


    // use + to change to integer
    this.list.forEach((d) => {
      d.stats[xKey] = +d.stats[xKey];
      d.stats[yKey] = +d.stats[yKey];
      d.rank = +d.rank;
    });

    x.domain(d3.extent(this.list, (d) => d.stats[xKey]));

    y.domain([0, d3.max(this.list, (d) => d.stats[yKey])]);

    svg.selectAll('dot')
        // .data(this.list, (d) => {
        //   //unique identifier of each piece of data
        // });
        .data(this.list)
      .enter().append('circle')
        .attr("r", (d) => {

          if (!d.rank) {

            return 20;

          }
          return Math.sqrt(d.rank / 3);
        })
        .attr("cx", (d) => x(d.stats[xKey]))
        .attr("cy", (d) => y(d.stats[yKey]))
        .style("fill", (d) => d.color)
        .attr("class", (d) => {
          if (!d.rank) {

            return "player-circle";
          }
          return "circle";
        })

        .on("mouseover", (d) => {
          const playerData = [];
          const winData = [];
          const damage = [];
          // playerData.push({"name": d.name});
          // playerData.push({"rank": d.rank});
          // Object.keys(d.stats).forEach((key) => {
          //   playerData.push({[key]: d.stats[key]});
          //   // debugger
          // });
          playerData.push({"label": "Avg Kills", "value": d.stats.avgKills});
          playerData.push({"label": "Avg Assists", "value": d.stats.avgAssists});
          playerData.push({"label": "Avg Deaths", "value": d.stats.avgDeaths});

          winData.push({"label": "Wins", "value": d.stats.totalSessionsWon});
          winData.push({"label": "Losses", "value": d.stats.totalSessionsLost});

          damage.push({"label": "Phys. Dmg", "value": d.stats.avgPhysicalDamage});
          damage.push({"label": "Magic Dmg", "value": d.stats.avgMagicDamage});

          // debugger
          d3.select(".piesvg").remove();
          d3.select(".piesvg").remove();
          d3.select(".piesvg").remove();
          // tooltip.html(`<h3>Summoner: ${d.name}</h3>` + `<article>${labels[xKey]}: ${d.stats[xKey]}</article>` + `<article>${labels[yKey]}: ${d.stats[yKey]}</article>`)

          this.renderPie(playerData);
          this.renderPie(winData);
          this.renderPie(damage);

          tooltip.transition()
            .duration(200)
            .style("opacity", .9)

            //call draw function for new thing
          tooltip.select(".tooltip-header")
            .html(`<h3>Summoner: ${d.name}</h3>` + `<article>Rank: ${d.ranking}</article>` + `<article>${labels[xKey]}: ${d.stats[xKey]}</article>` + `<article>${labels[yKey]}: ${d.stats[yKey]}</article>`)
          // tooltip.html(`<h3>Summoner: ${d.name}</h3>` + `<article>${labels[xKey]}: ${d.stats[xKey]}</article>` + `<article>${labels[yKey]}: ${d.stats[yKey]}</article>`)
          // tooltip.exit().remove()
          // tooltip.enter()
              // .style("left", "45vw")
              // .style("top", "10vh");
          let xLocation;
          if ((window.innerWidth - 520) < d3.event.pageX) {
            xLocation = (d3.event.pageX - ($('.tooltip')[0].offsetWidth + 20));
            // debugger
          } else {
            xLocation = (d3.event.pageX + 20);
          }
            tooltip
              .style("left", (xLocation) + "px")
              .style("top", (d3.event.pageY - 50) + "px");




        })
        .on("mouseout", (d) => {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
            // d3.select(".piesvg").transition()
            // .duration(500)
            // .remove();
        });

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axis-line")
        .call(d3.axisBottom(x));
    svg.append("text")
      .attr("transform",
        "translate(" + (width/2) + " ," + (height - margin.bottom + 60) + ")")
      .attr("dx", "1em")
      .style("text-anchor", "middle")
      .attr("class", "axis-label")
      .text(`${labels[xKey]}`);

    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis-line");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axis-label")
      .style("text-anchor", "middle")
      .text(`${labels[yKey]}`);

      this.highlightClick();

  }

  highlightClick() {
    $('svg').find("circle").click((e) => {
      $(e.currentTarget).toggleClass("highlight-circle");
      // this.highlighted.push()
      // debugger
    });
  }
}


export default Draw;
