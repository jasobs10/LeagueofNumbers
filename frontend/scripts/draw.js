import {labels} from './helper';

class Draw {
  constructor() {

    this.list = "";
  }

  setAttributes() {
    this.list.forEach((el) => {
      el.color = '#' + Math.floor(Math.random()*16777215).toString(16);
      el.averages = {};
      el.averages.kda = (el.stats.totalChampionKills + el.stats.totalAssists) / el.stats.totalDeathsPerSession;
      el.averages.damageDealt = (el.stats.totalDamageDealt / el.stats.totalSessionsPlayed);

    });
  }

  // mapCoordinates() {
  //
  // }

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
  }

  renderPlayer(player) {
    this.list.push(player);
    console.log(this.list)
    console.log(player)
    const xAx = $("x-axis").find(":selected").val();
    const yAx = $("y-axis").find(":selected").val();
    this.render(xAx, yAx);

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
          // debugger
          if (!d.rank) {
            // debugger
            return 20;
            // debugger
          }
          return Math.sqrt(d.rank / 3);
        })
        .attr("cx", (d) => x(d.stats[xKey]))
        .attr("cy", (d) => y(d.stats[yKey]))
        .style("fill", (d) => d.color)
        .attr("class", (d) => {
          if (!d.rank) {
            // debugger
            return "player-circle";
          }
        })
        // .style("fill", () => "hsl(" + Math.random() * 360 + ",100%,50%)"
        .on("mouseover", (d) => {
          tooltip.transition()
            .duration(200)
            .style("opacity", .9)
            // .style("background-color", "black")
          tooltip.html(`<h3>Summoner: ${d.name}</h3>` + "<br /> (" + d.stats[xKey] + ", " + d.stats[yKey] + ")")
          // tooltip.exit().remove()
              .style("left", "770px")
              .style("top", "570px")
          //     .append("div")
          //     .html("sdfdf")
              // .style("left", (d3.event.pageX + 30) + "px")
              // .style("top", (d3.event.pageY - 28) + "px");
              // .style("left", "780px")
              // .style("top", "570px")
        })
        .on("mouseout", (d) => {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    svg.append("text")
      .attr("transform",
        "translate(" + (width/2) + " ," + (height - margin.bottom + 60) + ")")
      .attr("dx", "1em")
      .style("text-anchor", "middle")
      .attr("class", "axis-label")
      .text(`${labels[xKey]}`);

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axis-label")
      .style("text-anchor", "middle")
      .text(`${labels[yKey]}`);




    // debugger
 //    var margin = {top: 20, right: 20, bottom: 30, left: 40},
 //    width = 960 - margin.left - margin.right,
 //    height = 500 - margin.top - margin.bottom;
 //
 //    //setup x
 //    const xValue = (d) => d.stats.totalChampionKills;
 //    // debugger
 //    const xScale = d3.scaleLinear().range([0, width]);
 //    const xMap = (d) => {
 //      // debugger
 //      return xScale(xValue(d));
 //    };
 //    // debugger
 //    const xAxis = d3.axisBottom(xScale);
 //
 //    //setup y
 //    const yValue = (d) => d.stats.maxTimePlayed;
 //    const yScale = d3.scaleLinear().range([height, 0]);
 //    const yMap = (d) => {
 //      // debugger
 //      yScale(yValue(d));
 //    };
 //    const yAxis = d3.axisLeft(yScale);
 //
 //    //setup fill color
 //
 //    // var cValue = function(d) { return d.Manufacturer;},
 //    // color = d3.scale.category10();
 //
 //    //add graph canvas to page
 //
 //    var svg = d3.select("body").append("svg")
 //        .attr("width", width + margin.left + margin.right)
 //        .attr("height", height + margin.top + margin.bottom)
 //      .append("g")
 //        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 //
 //
 //        var tooltip = d3.select("body").append("div")
 //        .attr("class", "tooltip")
 //        .style("opacity", 0);
 //
 //
 //      this.list.forEach(function(d) {
 //        d.stats.totalChampionKills = +d.stats.totalChampionKills;
 //        d.stats.maxTimePayed = +d.stats.maxTimePayed;
 //    //    console.log(d);
 //      });
 //
 //
 //
 //    // don't want dots overlapping axis, so add in buffer to data domain
 //    xScale.domain([d3.min(this.list, xValue)-1, d3.max(this.list, xValue)+1]);
 //    yScale.domain([d3.min(this.list, yValue)-1, d3.max(this.list, yValue)+1]);
 //
 //    // x-axis
 //  svg.append("g")
 //      .attr("class", "x axis")
 //      .attr("transform", "translate(0," + height + ")")
 //      .call(xAxis)
 //    .append("text")
 //      .attr("class", "label")
 //      .attr("x", width)
 //      .attr("y", -6)
 //      .style("text-anchor", "end")
 //      .text("Total Damage Dealt");
 //
 //  // y-axis
 //  svg.append("g")
 //      .attr("class", "y axis")
 //      .call(yAxis)
 //    .append("text")
 //      .attr("class", "label")
 //      .attr("transform", "rotate(-90)")
 //      .attr("y", 6)
 //      .attr("dy", ".71em")
 //      .style("text-anchor", "end")
 //      .text("Max time played");
 //
 //
 //
 //
 //
 //      // draw dots
 //      // debugger
 //      svg.selectAll(".dot")
 //          .data(this.list)
 //        .enter().append("circle")
 //          .attr("class", "dot")
 //          .attr("r", 3.5)
 //          .attr("cx", xMap)
 //          .attr("cy", yMap)
 //
 //          .on("mouseover", function(d) {
 //              tooltip.transition()
 //                   .duration(200)
 //                   .style("opacity", .9);
 //              tooltip.html("cool" + "<br/> (" + xValue(d)
 //    	        + ", " + yValue(d) + ")")
 //                   .style("left", (d3.event.pageX + 5) + "px")
 //                   .style("top", (d3.event.pageY - 28) + "px");
 //          })
 //          .on("mouseout", function(d) {
 //              tooltip.transition()
 //                   .duration(500)
 //                   .style("opacity", 0);
 //          });
 //
 //          var legend = svg.selectAll(".legend")
 //
 //     .enter().append("g")
 //       .attr("class", "legend")
 //       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
 //       legend.append("rect")
 //     .attr("x", width - 18)
 //     .attr("width", 18)
 //     .attr("height", 18)
 //
 //
 // // draw legend text
 // legend.append("text")
 //     .attr("x", width - 24)
 //     .attr("y", 9)
 //     .attr("dy", ".35em")
 //     .style("text-anchor", "end")
 //    //  .text(function(d) { return d;})


  }

  renderData(data) {

  }

  addAxes(x, y) {

  }

  clearChart() {

  }

}

export default Draw;
