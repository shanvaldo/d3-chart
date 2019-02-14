import React, { Component } from "react";

import BarChart from "./components/BarChart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: [
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
      ]
    }
  }

  render() {
    return (
      <div className="app">
        <BarChart data={this.state.sample} width={1000} height={600} margin={80} />
      </div>
    );
  }
}

export default App;
