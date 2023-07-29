import { useState, useEffect } from "react"
import { FaBitcoin } from "react-icons/fa"
import {
  MenuItem,
  TextField
} from "@mui/material"
import axios from "axios"

function App() {
  const [coin, setCoin] = useState([])
  const [currencyAmt, setCurrencyAmt] = useState("")
  const [currency, setCurrency] = useState("")
  
  const currentPrice = coin[0]

  const onCurrencyAmtChange = (e) => {
    setCurrencyAmt(e.target.value)
  }

  const onCurrencyChange = (e) => {
    setCurrency(e.target.value)
  }

  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=1&page=1&sparkline=false&locale=en&precision=2"

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoin(response.data)
      console.log(response.data[0])
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const currencies = [
    {
        value: "BTC",
        label: "BTC"
    },
    {
        value: "USD",
        label: "USD"
    },
]

  return (
    <div className="App">
      <div className="container">
        <header className="header">
            <FaBitcoin size="60px" style={{ margin: "10px", marginTop: "12px", color: "#F2A900"}}/>
            Bitcoin Budget
        </header>
        <div className="btc-price">
          <h4>Current <FaBitcoin size="18px" style={{ margin: "0px 10px", color: "#F2A900"}}/> Price:</h4>
          <h4>${}</h4>
        </div>
        <h5>amount you would like to purchase on a recurring basis:</h5>
        <div className="input-line">
          <TextField 
            id="outlined-basic" 
            label="currency amount"
            variant="outlined"
            onChange={onCurrencyAmtChange}
            value={currencyAmt}
            required
            sx={{
                m: 1
            }}
          />
          <TextField 
              id="outlined-select"
              select
              label="currency"
              defaultValue=""
              helperText="select btc or usd"
              variant="outlined"
              onChange={onCurrencyChange}
              value={currency}
              required
              sx={{
                  m: 1,
              }}
          >
              {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                      {option.label}
                  </MenuItem>
              ))}
          </TextField>
        </div>
      </div>
    </div>
  );
}

export default App;
