import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oweMore: undefined,
      total: 0,
      "twenties": 0,
      "tens": 0,
      "fives": 0,
      "ones": 0,
      "quarters": 0,
      "dimes": 0,
      "nickels": 0,
      "pennies": 0
    }
  }

  handleClick (e) {
    e.preventDefault();
    const due = document.getElementById('amount-due').value;
    const received = document.getElementById('amount-received').value;
   
    let total = parseFloat(received) - parseFloat(due);

    let dollars = Math.floor(total);
    let change = (total % 1).toFixed(2);

    let nominals = {
      twenties: 20,
      tens: 10,
      fives: 5,
      ones: 1,
      quarters: 0.25,
      dimes: 0.10,
      nickels: 0.05,
      pennies: 0.01
    }

    if(total < 0){
      this.setState({oweMore: true});
      dollars *= -1;
      change *= -1;
    }else{
      this.setState({oweMore: false})
    };

    this.setState({total: total });

    Object.keys(nominals).forEach( nominal => {
      if(nominals[nominal] >= 1){
        let c = 0;
        while(dollars - nominals[nominal] >= 0){
          dollars -= nominals[nominal];
          this.setState({nominal: this.state[nominal]++});
        }
        c = 0;
      }else{
        let i = 0;
        while(change - nominals[nominal] >= 0){
          // use parsefloat and to fixed because if not javascript
          // will do some funky floating point math
          change = parseFloat(change).toFixed(2) - nominals[nominal].toFixed(2);
          this.setState({nominal: this.state[nominal]++});
        }
        i = 0;
      }
    })

  }

  render() {
    return(
      <div className="row" style={{"margin": "20px"}}>
        <div className="row row-offset-2">
          <h2>Change Calculator</h2>
        </div>
        <div className="panel panel-default col-sm-4">
          <h3 className="panel-heading" >Enter Information</h3>
          <div className="panel-body">
            <div>
              <label htmlFor="amountDue">Amount</label>
              <input name="amountDue" type="text"
              id="amount-due" placeholder="0"></input>
            </div>

            <div>
              <label htmlFor="amountReceived">Receivedt</label>
              <input name="amountReceived" type="text"
              id="amount-received" placeholder="0"></input>
            </div>

            <button className="btn btn-primary"
            onClick={this.handleClick.bind(this)}>Calculate</button>
          </div>
        </div>
        
        <div className="col-sm-6 panel panel-default" id="change-containere">
          {
            this.state.oweMore ?
            <div className="alert alert-danger">
              You own ${this.state.total} more!
            </div> :
            <div className="alert alert-success">
              The total change due is ${this.state.total}
            </div>
          }

          <div className="col-sm">
            <h4>Twenties</h4>
            <div className="change">
              {this.state.twenties}
            </div>
          </div>

          <div className="col-sm">
            <h4>Tens</h4>
            <div className="change">
              { this.state.tens }
            </div>
          </div>

          <div className="col-sm">
            <h4>fives</h4>
            <div className="change">
              { this.state.fives }
            </div>
          </div>

          <div className="col-sm">
            <h4>ones</h4>
            <div className="change">
            { this.state.ones }
            </div>
          </div>

          <div className="col-sm">
            <h4>quarters</h4>
            <div className="change">
              { this.state.quarters }
            </div>
          </div>

          <div className="col-sm">
            <h4>dimes</h4>
            <div className="change">
              { this.state.dimes }
            </div>
          </div>

          <div className="col-sm">
            <h4>nickels</h4>
            <div className="change">
              { this.state.nickels }
            </div>
          </div>

          <div className="col-sm">
            <h4>pennies</h4>
            <div className="change">
              { this.state.pennies }
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
