import {labels} from './helper';

class Draw {
  constructor() {

    this.list = "";
  }

  setAttributes() {
    this.list.forEach((el) => {
      el.color = '#' + Math.floor(Math.random()*16777215).toString(16);
      this.setAverages(el);
    });
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
      this.render(xAx, yAx);
    });

    $('button').click((e) => this.autoAxis());
  }

  renderPlayer(player) {
    this.setAverages(player);
    this.list.push(player);

    const xAx = $("#x-axis").find(":selected").val();
    const yAx = $("#y-axis").find(":selected").val();
    this.render(xAx, yAx);

  }

  autoAxis(axis) {
    const xAxis = $('#x-axis').children();
    const yAxis = $('#y-axis').find(":selected").val();
    xAxis.each((i, item) => {
      if (item.value !== "-- select data --") {
        let interval = 1000;
        setTimeout(() => {
          this.render(item.value, yAxis);
          interval += 1000;
        }, interval);
      }
    });
  }



  render(xArg, yArg) {
    let xKey;
    let yKey;
    if (xArg && yArg) {
      xKey = xArg;
      yKey = yArg;
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

    const tooltip = d3.select(".chart-container").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    tooltip.append("h1");
    tooltip.append("article");
    tooltip.append("article");


    // use + to change to integer
    this.list.forEach((d) => {
      d.stats[xKey] = +d.stats[xKey];
      d.stats[yKey] = +d.stats[yKey];
      d.rank = +d.rank;
    });

    x.domain(d3.extent(this.list, (d) => d.stats[xKey]));

    y.domain([0, d3.max(this.list, (d) => d.stats[yKey])]);

    svg.selectAll('dot')
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
          tooltip.transition()
            .duration(200)
            .style("opacity", .9)

          tooltip.html(`<h3>Summoner: ${d.name}</h3>` + `<article>${labels[xKey]}: ${d.stats[xKey]}</article>` + `<article>${labels[yKey]}: ${d.stats[yKey]}</article>`)
          // tooltip.exit().remove()
              .style("left", "50vw")
              .style("top", "75vh")
        })
        .on("mouseout", (d) => {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
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


  }

}

export default Draw;
