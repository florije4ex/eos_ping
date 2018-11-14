import React from 'react'
import ReactDOM from 'react-dom'
import EOS from 'eosjs'

const EOS_CONFIG = {
  contractName: "ping.ctr", // Contract name
  contractSender: "tester", // User executing the contract (should be paired with private key)
  clientConfig: {
    keyProvider: ['5KWfNLVokpE22KmP7HTQHW3KfkFUeMabTgnBYMn5J9FrYkcaWqJ'], // Your private key
    httpEndpoint: 'http://127.0.0.1:8888', // EOS http endpoint
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    debug: true,
  }
};

class Pingdemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pingStatus: false }
  }

  sendPing() {
    this.setState({ pingStatus: 'loading' });
    let eosClient = EOS.Localnet(EOS_CONFIG.clientConfig);
    
    eosClient.contract(EOS_CONFIG.contractName)
      .then((contract) => {
        contract.ping(EOS_CONFIG.contractSender, { authorization: [EOS_CONFIG.contractSender] })
          .then((res) => {
            console.log(res);
            this.setState({ pingStatus: 'success' })
          })
          .catch((err) => { this.setState({ pingStatus: 'fail' }); console.log(err) })
      })
  }

  render() {
    if (!this.state.pingStatus){
      return (<button onClick={this.sendPing.bind(this)}>Ping EOS</button>)
    } else if (this.state.pingStatus == "loading") {
      return (<span style={{ color: "gray" }}>Pinging EOS...</span>)
    } else if (this.state.pingStatus == "success") {
      return (<span style={{ color: "green" }}>Ping successful!</span>)
    } else if (this.state.pingStatus == "fail") {
      return (<span style={{ color: "red" }}>Ping unsuccessful</span>)
    }
  }
}

ReactDOM.render(<Pingdemo />, document.getElementById('app'));

module.hot.accept();