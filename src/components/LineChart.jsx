import { Component } from "react";
import _ from "lodash";

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
    const data = this.props.data;
    const margin = 80;
    const width = this.props.width - 2 * margin;
    const height = this.props.height - 2 * margin;

    const max = _.maxBy(data, function(o) {
      return o.value;
    });

    const svg = d3
      .select("#line-chart-container")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    // Set X-axis value range
    const xScale = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(
        data.map(function(d) {
          return d.month;
        })
      );

    // Set Y-axis value range
    const yScale = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, max.value]);

    // Define grid lines
    const makeYLines = () => d3.axisLeft().scale(yScale);

    // Create X Line
    chart
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    // Create Y Line
    chart.append("g").call(d3.axisLeft(yScale));

    // Create grid lines
    chart
      .append("g")
      .attr("class", "grid")
      .attr("opacity", 0.2)
      .call(
        makeYLines()
          .tickSize(-width, 0, 0)
          .tickFormat("")
      );

    // Create line chart
    const lineChart = chart
      .selectAll("rect")
      .data(data)
      .enter()
      .append("g");

    const line = d3
      .line()
      .x(function(d, i) {
        return xScale(d.month) + xScale.bandwidth() / 2;
      })
      .y(function(d) {
        return yScale(d.value);
      })
      .curve(d3.curveMonotoneX);

    lineChart
      .append("path")
      .attr("class", "line-path") // Assign a class for styling
      .attr("d", line(data))
      .transition()
      .duration(1500)
      .attrTween("stroke-dasharray", function() {
        var l = this.getTotalLength(),
          i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) {
          return i(t);
        };
      });

    // Create dots in line chart
    lineChart
      .append("circle")
      .attr("class", "dot") // Assign a class for styling

      .attr("cx", function(d, i) {
        return xScale(d.month) + xScale.bandwidth() / 2;
      })
      .attr("cy", function(d) {
        return yScale(d.value);
      })
      .attr("r", 5);

    // Chart label
    svg
      .append("text")
      .attr("class", "label")
      .attr("x", -(height / 2) - margin)
      .attr("y", margin / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text(this.props.yAxisTitle);

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width / 2 + margin)
      .attr("y", height + margin * 1.7)
      .attr("text-anchor", "middle")
      .text(this.props.xAxisTitle);

    svg
      .append("text")
      .attr("class", "title")
      .attr("x", width / 2 + margin)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text(this.props.chartTitle);
  };

  render() {
    return (
      <div
        id="line-chart-container"
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;

          .line-path {
            fill: none;
            stroke: #ff6260;
            stroke-width: 3;
          }

          .dot {
            fill: #ff6260;
            stroke: #df2572;
            stroke-width: 3;
          }

          line {
            stroke: grey;
          }

          text {
            text-transform: capitalize;
          }
        `}
      />
    );
  }
}
