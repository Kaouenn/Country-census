import React from "react";
import axios from "axios";

class GetData extends React.Component {
  state = {
    usersData: [],
    SelectDataName: [],
    selectedId: ""
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
        <ul className="bloc-result" key={index}>
          {[tabUsers].map((user, index) => (
            <li className="resultData " key={index}>
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
              {/* {Object.keys(
                this.state.selectedId[0].map(keyName => {
                  const items = this.state.selectedId[0][keyName];

                  return (
                    <option key={items._id} value={items._id}>
                      {items.age}
                    </option>
                  );
                })
              )} */}

              <option value="education">Education</option>
              <option value="birth country">Birth country</option>
              <option value="sex">Sex</option>
              <option value="mace">Mace</option>
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
    const response = await axios.get("http://localhost:3000/users");
    const responseDataName = await axios.get("http://localhost:3000/users");
    this.setState({
      usersData: response.data,
      SelectDataName: responseDataName.data
    });
  };
}

export default GetData;
