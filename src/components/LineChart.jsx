import React, { Component } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as d3 from "d3";

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.createLineChart = this.createLineChart.bind(this);
  }

  componentDidMount = () => {
    this.createLineChart();
  };

  createLineChart = () => {
    var sample = [
      {
        month: "january",
        value: "99"
      },
      {
        month: "february",
        value: "70"
      },
      {
        month: "march",
        value: "60"
      },
      {
        month: "april",
        value: "90"
      },
      {
        month: "may",
        value: "45"
      },
      {
        month: "june",
        value: "63"
      },
      {
        month: "july",
        value: "69"
      },
      {
        month: "august",
        value: "32"
      },
      {
        month: "september",
        value: "88"
      },
      {
        month: "october",
        value: "77"
      },
      {
        month: "november",
        value: "100"
      },
      {
        month: "december",
        value: "89"
      }
    ];

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 960,
      height = 400;

    var xScale = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(
        sample.map(function(d) {
          return d.month;
        })
      );
    var yScale = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([
        0,
        d3.max(sample, function(d) {
          return d.value;
        })
      ]);

    var svg = d3
      .select("#container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // axis-x
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    // axis-y
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yScale));

    var bar = g
      .selectAll("rect")
      .data(sample)
      .enter()
      .append("g");

    // bar chart
    // bar
    //   .append("rect")
    //   .attr("x", function(d) {
    //     return xScale(d.month);
    //   })
    //   .attr("y", function(d) {
    //     return yScale(d.value);
    //   })
    //   .attr("width", xScale.bandwidth())
    //   .attr("height", function(d) {
    //     return height - yScale(d.month);
    //   });
    // .attr("class", function(d) {
    //   var s = "bar ";
    //   if (d[1] < 400) {
    //     return s + "bar1";
    //   } else if (d[1] < 800) {
    //     return s + "bar2";
    //   } else {
    //     return s + "bar3";
    //   }
    // });

    // labels on the bar chart
    bar
      .append("text")
      .attr("dy", "1.3em")
      .attr("x", function(d) {
        return xScale(d.month) + xScale.bandwidth() / 2;
      })
      .attr("y", function(d) {
        return yScale(d.value);
      })
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "black")
      .text(function(d) {
        return d.month;
      });

    // line chart
    var line = d3
      .line()
      .x(function(d, i) {
        return xScale(d.month) + xScale.bandwidth() / 2;
      })
      .y(function(d) {
        return yScale(d.value);
      })
      .curve(d3.curveMonotoneX);

    bar
      .append("path")
      .attr("class", "line") // Assign a class for styling
      .attr("d", line(sample)); // 11. Calls the line generator

    bar
      .append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function(d, i) {
        return xScale(d.month) + xScale.bandwidth() / 2;
      })
      .attr("cy", function(d) {
        return yScale(d.value);
      })
      .attr("r", 5);
  };

  render() {
    return (
      <div
        id="container"
        css={css`
          background-color: #fff;

          .bar1 {
            fill: aqua;
          }
          .bar2 {
            fill: deepskyblue;
          }
          .bar3 {
            fill: steelblue;
          }
          .bar:hover {
            fill: orange;
          }
          .axis--x path {
            display: none;
          }
          .line {
            fill: none;
            stroke: royalblue;
            stroke-width: 3;
          }
          .dot {
            fill: royalblue;
            stroke: royalblue;
          }
        `}
      >
        <svg />
      </div>
    );
  }
}
