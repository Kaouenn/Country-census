import React from "react";
import axios from "axios";

class GetData extends React.Component {
  state = {
    usersData: [],
    selectedId: "",
    isLoading: true
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ [event.target.name]: value });
  };

  sortNumber(a, b) {
    return b - a;
  }

  averageAge = data => {
    let total = 0;
    for (var i = 0; i < data.length; i++) {
      total += data[i].age;
    }
    return total;
  };

  renderTotalPerUser = dataName => {
    let result = Object.values(
      this.state.usersData.reduce((a, c) => {
        if (!a[c[dataName]]) a[c[dataName]] = [];
        a[c[dataName]].push(c);
        return a;
      }, {})
    );

    if (this.state.selectedId.length !== 0) {
      return result.map((tabUsers, index) => (
        <ul key={index}>
          {[tabUsers].map((user, index) => (
            <li className="resultData" key={index}>
              <span className="span-title">
                {user[0][this.state.selectedId]}
              </span>
              <span className="span-number">{user.length} pers</span>
              <span className="span-age">
                {Math.floor(this.averageAge(user) / user.length)} years old
              </span>
            </li>
          ))}
        </ul>
      ));
    }
  };

  render = () => {
    return (
      <div>
        <div className="get-data">
          <h2>
            Data's selector
            <span role="img" aria-label="1">
              👇
            </span>
          </h2>
          <div>
            <select
              className="input-get-data"
              name="selectedId"
              onChange={this.handleChange}
            >
              <option value="">Choose your Data ..</option>

              {this.state.isLoading === true ? (
                <option>En cours de chargement ...</option>
              ) : (
                Object.keys(this.state.usersData[0]).map((keyName, index) => {
                  return (
                    <option key={index} value={keyName.toString()}>
                      {keyName.toString()}
                    </option>
                  );
                })
              )}
            </select>
          </div>
          <ul>
            <li className="resultData-informations">
              <span className="span-title">
                {this.state.selectedId === ""
                  ? "Choose your Data 👆"
                  : this.state.selectedId}
              </span>
              <span className="span-number">Number of people</span>
              <span className="span-age"> Average age</span>
            </li>
          </ul>

          {this.renderTotalPerUser([this.state.selectedId])}
        </div>
      </div>
    );
  };

  componentDidMount = async () => {
    const response = await axios.get(
      "https://country-census-back.herokuapp.com/users"
    );
    this.setState({
      usersData: response.data,
      isLoading: false
    });
  };
}

export default GetData;
