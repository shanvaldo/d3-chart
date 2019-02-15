import { Component } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: [
        {
          month: "january",
          value: 22
        },
        {
          month: "february",
          value: 70
        },
        {
          month: "march",
          value: 60
        },
        {
          month: "april",
          value: 40
        },
        {
          month: "may",
          value: 10
        },
        {
          month: "june",
          value: 55
        },
        {
          month: "july",
          value: 68
        },
        {
          month: "august",
          value: 81
        },
        {
          month: "september",
          value: 91
        },
        {
          month: "october",
          value: 45
        },
        {
          month: "november",
          value: 100
        },
        {
          month: "december",
          value: 78
        }
      ]
    };
  }

  render() {
    return (
      <div
        className="app"
        css={css`
          margin: 50px auto;
        `}
      >
        <LineChart
          data={this.state.sample}
          width={1000}
          height={600}
          chartTitle="data"
          xAxisTitle="months"
          yAxisTitle="values"
        />
        <BarChart
          data={this.state.sample}
          width={1000}
          height={600}
          chartTitle="data"
          xAxisTitle="months"
          yAxisTitle="values"
        />
      </div>
    );
  }
}

export default App;
