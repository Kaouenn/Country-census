import React from "react";
import ReactDOM from "react-dom";
import GetData from "./components/GetData";
import Header from "./components/Header";
import "./index.css";

class App extends React.Component {
  render = () => {
    return (
      <div className="App">
        <Header />
        <GetData />
      </div>
    );
  };
}
ReactDOM.render(<App />, document.getElementById("root"));
