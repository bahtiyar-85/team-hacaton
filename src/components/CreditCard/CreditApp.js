import React from "react"; 
import Card from "react-credit-cards"; 
import './CreditCard.css'; 
import Price from '../Price/Price'
 
import SupportedCards from "./CreditCard.js"; 
 
import { 
  formatCreditCardNumber, 
  formatCVC, 
  formatExpirationDate, 
  formatFormData 
} from "./CreditUtils"; 
 
import "react-credit-cards/es/styles-compiled.css"; 
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
 
export default class App extends React.Component { 
  state = { 
    number: "", 
    name: "", 
    expiry: "", 
    cvc: "", 
    issuer: "", 
    focused: "", 
    formData: null 
  }; 
 
  handleCallback = ({ issuer }, isValid) => { 
    if (isValid) { 
      this.setState({ issuer }); 
    } 
  }; 
 
  handleInputFocus = ({ target }) => { 
    this.setState({ 
      focused: target.name 
    }); 
  }; 
 
  handleInputChange = ({ target }) => { 
    if (target.name === "number") { 
      target.value = formatCreditCardNumber(target.value); 
    } else if (target.name === "expiry") { 
      target.value = formatExpirationDate(target.value); 
    } else if (target.name === "cvc") { 
      target.value = formatCVC(target.value); 
    } 
 
    this.setState({ [target.name]: target.value }); 
  }; 
 
  handleSubmit = e => { 
    e.preventDefault(); 
    const { issuer } = this.state; 
    const formData = [...e.target.elements] 
      .filter(d => d.name) 
      .reduce((acc, d) => { 
        acc[d.name] = d.value; 
        return acc; 
      }, {}); 
 
    this.setState({ formData }); 
    this.form.reset(); 
  }; 

  render() { 
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state; 

 
    return ( 
      <div key="Payment" className="container" style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}> 
      
        <div className="App-payment" style={{ width: '50%',  height: '70%', textAlign:'center', fontSize: '15px'}}> 
        <h1 style={{color: 'white', marginBottom: '5px'}}>Пожалуйста заполните все поля формы оплаты</h1>
          <Card  
            style={{width: '100%'}}
            number={number} 
            name={name} 
            expiry={expiry} 
            cvc={cvc} 
            focused={focused} 
            callback={this.handleCallback} 
          /> 
          <form className="inputCard"  ref={c => (this.form = c)} onSubmit={this.handleSubmit}> 

          <form style={{width: '100%', marginTop: '10px', marginBottom: '15px'}}>
          <div style={{width: '100%'}}> 
              <input 
              style={{backgroundColor: "#ffffff", borderRadius: "5px", height: '25px', width: '90%', margin: 1}}
                type="text" 
                name="paymentName" 
                className="form-control" 
                placeholder="Name"
                // maxLength={19} 
                required 
                onChange={this.handleInputChange} 
                onFocus={this.handleInputFocus} 
              /> 
            </div> 

            <div style={{width: '100%'}}> 
              <input 
              style={{backgroundColor: "#ffffff", borderRadius: "5px", height: '25px', width: '90%', margin: 1}}
                type="text" 
                name="paymentSurname" 
                className="form-control" 
                placeholder="Surname"
                // maxLength={19} 
                required 
                onChange={this.handleInputChange} 
                onFocus={this.handleInputFocus} 
              /> 
            </div> 

            <div style={{width: '100%'}}> 
              <input 
              style={{backgroundColor: "#ffffff", borderRadius: "5px", height: '25px', width: '90%', margin: 1}}
                type="text" 
                name="paymentAddress" 
                className="form-control" 
                placeholder="Address"
                // maxLength={19} 
                required 
                onChange={this.handleInputChange} 
                onFocus={this.handleInputFocus} 
              /> 
            </div> 

          </form>
            <div style={{width: '100%'}}> 
              <input 
              style={{backgroundColor: "#ffffff", borderRadius: "5px", height: '25px', width: '90%', margin: 1}}
                type="tel" 
                name="number" 
                className="form-control" 
                placeholder="Card Number" 
                maxLength={19} 
                required 
                onChange={this.handleInputChange} 
                onFocus={this.handleInputFocus} 
              /> 
            </div> 
            <div className="form-group"> 
              <input 
              style={{backgroundColor: "#ffffff", borderRadius: "5px", height: '25px', width: '90%', margin: 1}}
                type="text" 
                name="name" 
                className="form-control" 
                placeholder="Name" 
                required 
                onChange={this.handleInputChange} 
                onFocus={this.handleInputFocus} 
              /> 
            </div> 
            <div className="row" className="form-group"> 
              <div className="col-6"> 
                <input 
                style={{backgroundColor: "#ffffff", borderRadius: "5px", height: '25px', width: '90%', margin: 1}}
                  type="tel" 
                  name="expiry" 
                  className="form-control" 
                  placeholder="Valid Thru" 
                  pattern="\d\d/\d\d" 
                  required 
                  onChange={this.handleInputChange} 
                  onFocus={this.handleInputFocus} 
                /> 
              </div> 
              <div className="col-6"> 
                <input 
                  style={{backgroundColor: "#ffffff", borderRadius: "5px", height: '25px', width: '90%', margin: 1}}
                  type="tel" 
                  name="cvc" 
                  className="form-control" 
                  placeholder="CVC" 
                  maxLength={3} 
                  required 
                  onChange={this.handleInputChange} 
                  onFocus={this.handleInputFocus} 
                /> 
              </div> 
            </div> 
            <input type="hidden" name="issuer" value={issuer} /> 
            <div className="form-actions"> 
              <Link to="/"><Button className="button" onClick={() => alert('Спасибо за покупку!')} style={{marginTop:"10px", width: '100%', height: 'auto'}} variant="contained" color='secondary'>Оплатить покупку</Button></Link> 
            </div> 
          </form> 
           
 
          <SupportedCards /> 
        </div> 
 
      </div> 
    ); 
  } 
}