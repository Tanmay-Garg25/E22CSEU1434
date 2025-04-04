const express = require("express");
const app = express();
const path = require("path");
const port = 9876;
const hbs = require("hbs");
const axios = require('axios');


const primeurl = 'http://20.244.56.144/evaluation-service/primes';
// const authHeader = { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNzQ1MDcyLCJpYXQiOjE3NDM3NDQ3NzIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE1Y2U4YjY3LTZkOGItNDA0Yy05ZjcyLTg0ZDg1M2QzZTE1NyIsInN1YiI6ImUyMmNzZXUxNDM0QGJlbm5ldHQuZWR1LmluIn0sImVtYWlsIjoiZTIyY3NldTE0MzRAYmVubmV0dC5lZHUuaW4iLCJuYW1lIjoidGFubWF5Iiwicm9sbE5vIjoiZTIyY3NldTE0MzQiLCJhY2Nlc3NDb2RlIjoicnRDSFpKIiwiY2xpZW50SUQiOiJhNWNlOGI2Ny02ZDhiLTQwNGMtOWY3Mi04NGQ4NTNkM2UxNTciLCJjbGllbnRTZWNyZXQiOiJ2YkFCYlpIWnlIVU5Ga0t3In0.1ZcRJBEh4mgYAC4qZ4eVhBIgq69dkdhxPBaYj5pZGeU' };

const evenurl = 'http://20.244.56.144/evaluation-service/even';
const fibourl = 'http://20.244.56.144/evaluation-service/fibo';
const randurl = 'http://20.244.56.144/evaluation-service/rand';

async function getAppToken() {
  try {
    const response = await axios.post(`http://20.244.56.144/evaluation-service/auth`, {
      email: "e22cseu1434@bennett.edu.in",
      name: "Tanmay",
      rollNo: "E22CSEU1434",
      accessCode: "rtCHZJ",
      clientID: "a5ce8b67-6d8b-404c-9f72-84d853d3e157",
      clientSecret: "vbABbZHZyHUNFkKw"
    });

    const token = response.data["token_type"] + " " + response.data["access_token"]

    return token
  } catch (error) {
    console.error(error);
    return null;
  }
}

const windowSize = 10;

let numbers = [];

let average = null;

function FetchToken(){
    const response = axios.get(evenurl, { headers: authHeader });

}

async function fetchEvenNumbers() {
  try {
    const token = await getAppToken()
    const authHeader = { Authorization: token}
    const response = await axios.get(evenurl, { headers: authHeader }); 

    for (const number of response.data["numbers"]) {
      numbers.push(number);
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchPrimeNumbers() {
  try {
    const token = await getAppToken();
    const authHeader = { Authorization: token};
    const response = await axios.get(primeurl, { headers: authHeader });

    for (const number of response.data) {
      numbers.push(number);
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchRandNumbers() {
  try {
    const token = await getAppToken();
    const authHeader = { Authorization: token};
    const response = await axios.get(randurl, { headers: authHeader });

    for (const number of response.data) {
      numbers.push(number);
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchFiboNumbers() {
  try {
    const token = await getAppToken();
    const authHeader = { Authorization: token};
    const response = await axios.get(fibourl, { headers: authHeader });

    for (const number of response.data) {
      numbers.push(number);
    }
  } catch (error) {
    console.error(error);
  }
}

function calculateAverage() {
  if (!numbers.length) {
    return null;
  }
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum / numbers.length;
}

function limitArraySize() {
  while (numbers.length > windowSize) {
    numbers.shift();
  }
}

app.get('/numbers/e', async (req, res) => {
  try {
    await fetchEvenNumbers();
    limitArraySize();
    const newAverage = calculateAverage();
    res.json({
      "numbers": [...numbers],
      "average": newAverage
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/numbers/p', async (req, res) => {
  try {
    await fetchPrimeNumbers();
    limitArraySize();
    const newAverage = calculateAverage();
    res.json({
      "numbers": [...numbers],
      "average": newAverage
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/numbers/f', async (req, res) => {
  try {
    await fetchFiboNumbers();
    limitArraySize();
    const newAverage = calculateAverage();
    res.json({
      "numbers": [...numbers],
      "average": newAverage
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/numbers/r', async (req, res) => {
  try {
    await fetchRandNumbers();
    limitArraySize();
    const newAverage = calculateAverage();
    res.json({
      "numbers": [...numbers],
      "average": newAverage
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



// app.get("/test", (req, res) => {
//     return res.status(200).json({message:"Success!"});
// });


// app.get("/numbers/e", (req, res) => {

//     axios.get(evenurl, { headers: authHeader }).then(
//         response => {

//             res.status(200).json(response.data;}).catch(error => {console.error(error);});

// })

// app.get("/numbers/f", (req, res) => {
//     axios.get(fibourl, { headers: authHeader }).then(
//         response => {
//             res.status(200).json(response.data;}).catch(error => {console.error(error);});

// })

// app.get("/numbers/p", (req, res) => {
//     axios.get(primeurl, { headers: authHeader }).then(
//         response => {
//             res.status(200).json(response.data;}).catch(error => {console.error(error);});

// })

// app.get("/numbers/r", (req, res) => {
//     aaxios.get(randurl, { headers: authHeader }).then(
//         response => {
//             res.status(200).json(response.data;}).catch(error => {console.error(error);});

// })




app.listen(port,(error)=>{
    if(!error){
        console.log("Server is running on port "+port);
    }
    else{
        console.log("Error: "+error);
    }
})