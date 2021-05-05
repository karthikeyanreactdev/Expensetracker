import React, { Component } from 'react';
import { Button, Form, Container, Jumbotron, Table, Row } from 'react-bootstrap';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      balance: 0,
      amount: '',
      errorMessage: '',
      transactionList: []
    }
  }

  // assign value to state variable using name
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
// adding amount to balance 
  handleAdd = (e) => {
    e.preventDefault()
    const { balance, amount, transactionList } = this.state;
	const currentDate = new Date(new Date()).toLocaleDateString('en-GB', { hour12: true, year: 'numeric', day: '2-digit', month: '2-digit', hour: 'numeric', minute: '2-digit', second: '2-digit', })
  .toString();  
    if (amount !== '') {
      const newAmount = (Number(balance) + Number(amount))

      this.setState({
        balance: newAmount
      });

      transactionList.push({ transaction: amount, date: currentDate, type: 'Add' })

    } else {
      this.setState({
        errorMessage: 'Please Enter Amount'
      })
    }

    setTimeout(() => {
      this.setState({
        errorMessage: ''
      })
    }, 3000);

  }

// removing amount from balance 
  handleRemove = (e) => {
    e.preventDefault()

    const { balance, amount, transactionList } = this.state;
	   const currentDate = new Date(new Date()).toLocaleDateString('en-GB', { hour12: true, year: 'numeric', day: '2-digit', month: '2-digit', hour: 'numeric', minute: '2-digit', second: '2-digit', })
  .toString();
    if (amount !== '') {

      const newAmount = (Number(balance) - Number(amount))
      this.setState({
        balance: newAmount
      });
      transactionList.push({ transaction: amount, date: currentDate, type: 'Remove' })
    } else {
      this.setState({
        errorMessage: 'Please Enter Amount'
      })
    }

    setTimeout(() => {
      this.setState({
        errorMessage: ''
      })
    }, 3000);
  }
 
  render() {
    const { balance, amount, transactionList, errorMessage } = this.state;
    return (
      <div>
        <Container bsPrefaix="nc" >

          {/* form part */}

          <Jumbotron className="mt-5 w-100">

            <h4 className="d-flex justify-content-center">  Expense Tracker - Basic</h4>
            <form>
              <Row className="w-100 ">
                <Row className="w-100  justify-content-center">
                  <Form.Group controlId="formBasicEmail " className="w-50">
                    <h6 className="d-flex justify-content-center mt-2" >Balance : {balance}</h6>
              <h6 style={{color:'red'}} className="d-flex justify-content-center">{errorMessage}</h6>

                    <Form.Control type="number" required placeholder="Amount" name="amount" min="0" value={amount} onChange={this.handleChange}
                    />
                  </Form.Group>
                </Row>
                <Row className="w-100  justify-content-center">

                  <Button
                    variant="success"
                    type="submit"
                    className="mb-4"
                    onClick={this.handleAdd}
                  >
                    Add
			          	</Button>
                  <Button
                    variant="danger"
                    type="submit"
                    className="mb-4 ml-3"
                    onClick={this.handleRemove}
                  >
                    Remove
			          	</Button>

                </Row>
              </Row>
            </form>
            </Jumbotron>
            
       {/* transaction list part */}
          <Jumbotron className="mt-8 w-100">
            <h4 className="">Transactions :</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Transaction Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {transactionList.map((i) => (
                  <tr style={i.type === "Add" ? { color: 'green' } : { color: 'red' }} >
                    <td>{i.date}</td>
                    <td>{i.transaction}</td>
                    <td>{i.type}</td>
                  </tr>

                ))}

              </tbody>
            </Table>

          </Jumbotron>

        </Container>
      </div >
    );
  }
}

export default App;


