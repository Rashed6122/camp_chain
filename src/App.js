//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { Component } from 'react';
//import Header from "./components/header.js";
//import NavBar from "./components/navbar";
//import MainPage from "./pages";
//import MyQuestions from "./pages/my_questions";
//import Profile from "./pages/profile";
//import Signin from "./pages/signin";
//import Register from "./pages/register";
//import { useEffect, useState } from 'react';
//import { ethers } from 'ethers';
import Web3 from 'web3';

import camp_chain from './abis/camp_chain.json';

// config
//import config from './config.json'



class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = networkId
    if(networkData) {
      const contract = new web3.eth.Contract( camp_chain, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
      this.setState({ contract })
      const Question = await contract.methods.getQuestions(12).call()
      console.log(Question.text)
      this.setState({ Text : Question.text })
      console.log(this.state.Text)
      console.log("done")
      console.log(this.state)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      Text: '',
      contract: null,
      web3: null,
      test: '',
      account: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    this.setState({test: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault()
    alert('A name was submitted: ' + this.state.test);
    //this.setState({ Text: this.state.test });
    console.log(camp_chain)
    console.log("Submitting file to block...")
    this.state.contract.methods.askQuestion(this.state.test).send({ from: this.state.account }).then((r) => {
      this.setState({ Text: this.state.test })
      console.log("send data... done")
    })
  }

  render(){
    return (
      <div className="App">
        <h1>camp_chain</h1>
        <h2>Add Questions</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Ask Question:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h1>Question1: {this.state.Text}</h1>
      </div>
    );
  }
}

export default App;
