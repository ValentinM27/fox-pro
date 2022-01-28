import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
        <div>
            Welcome to Fox'Pro !

            {localStorage.getItem("token")}
        </div>
    )
  }
}
