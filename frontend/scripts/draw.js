class Draw {
  constructor(list) {

    this.list = list;
  }

  // mapCoordinates() {
  //
  // }

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
    const margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const svg = d3.select(".chart-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        

    // use + to change to integer
    this.list.forEach((d) => {
      d.stats[xKey] = +d.stats[xKey];
      d.stats[yKey] = +d.stats[yKey];
    });

    x.domain(d3.extent(this.list, (d) => d.stats[xKey]));
    y.domain([0, d3.max(this.list, (d) => d.stats[yKey])]);

    svg.selectAll('dot')
        .data(this.list)
      .enter().append('circle')
        .attr("r", 5)
        .attr("cx", (d) => x(d.stats[xKey]))
        .attr("cy", (d) => y(d.stats[yKey]));

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

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
