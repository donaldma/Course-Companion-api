"use strict";

const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse
const axios = require('axios')

module.exports = (app) => {
  app.post('/sms', async (req, res) => {
    const twiml = new MessagingResponse

    let incomingMessage = req.body.Body.toLowerCase()

    if(/gas/.test(incomingMessage)) {
      await axios.get('https://api.fixer.io/latest?base=USD&symbols=CAD')
        .then(response => {
          let currentDollar = response.data.rates.CAD

          let incomingMessageArray = incomingMessage.split(' ')
          
          let litresPerGallon = 3.785
          let cadPricePerGallon = incomingMessageArray[1] * currentDollar // Current dollar
          let gasPrice = litresPerGallon / cadPricePerGallon
    
          let roundedGasPrice = gasPrice.toFixed(4)

          twiml.message(`${roundedGasPrice} CAD /L`)  
        })
        .catch(error => {
          console.log(error)
        })
    
    } else {
      twiml.message('Please enter a valid command')      
    }
    
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())
  })

}