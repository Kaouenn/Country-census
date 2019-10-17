import React from "react";
import GetData from "./GetData";
import Header from "./Header";

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

export default App;
