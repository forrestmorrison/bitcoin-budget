import { useState, useEffect } from "react"
import { FaBitcoin } from "react-icons/fa"
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material/styles"
import {
  MenuItem,
  TextField
} from "@mui/material"
import axios from "axios"

const theme = createTheme({
  palette: {
      primary: {
          main: '#F2A900'
      }
  },
  typography: {
    fontFamily: [
      "Ubuntu",
    ],
    button: {
      textTransform: 'none',
      fontWeight: "bold"
    }
  }
})

function App() {
  const [coin, setCoin] = useState([])
  const [currencyAmt, setCurrencyAmt] = useState("")
  const [currency, setCurrency] = useState("")
  const [frequency, setFrequency] = useState("")
  const [timeAmt, setTimeAmt] = useState("")
  const [timePeriod, setTimePeriod] = useState("")
  
  const currentPrice = coin[0]

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

  const frequencies = [
    {
        value: "none",
        label: ""
    },
    {
        value: "once per day",
        label: "once per day"
    },
    {
        value: "once per week",
        label: "once per week"
    },
    {
        value: "once per month",
        label: "once per month"
    }
  ]

  const timePeriods = [
    {
        value: "days",
        label: "days"
    },
    {
        value: "weeks",
        label: "weeks"
    },
    {
        value: "months",
        label: "months"
    },
    {
        value: "years",
        label: "years"
    }
  ]

  const onCurrencyAmtChange = (e) => {
    setCurrencyAmt(e.target.value)
  }

  const onCurrencyChange = (e) => {
    setCurrency(e.target.value)
  }

  const onFrequencyChange = (e) => {
    setFrequency(e.target.value)
  }

  const onTimeAmtChange = (e) => {
    setTimeAmt(e.target.value)
  }

  const onTimePeriodChange = (e) => {
      setTimePeriod(e.target.value)
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

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="header">
          <FaBitcoin size="60px" style={{ margin: "10px", marginTop: "12px", color: "#F2A900"}}/>
          Bitcoin Budget
        </header>
        <div className="container">
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
                  m: 1,
                  width: "300px"
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
          <h5>frequency rate to make recurring purchase:</h5>
          <div className="input-line">
            <TextField 
                id="outlined-select"
                select
                label="frequency"
                defaultValue=""
                helperText="select frequency"
                variant="outlined"
                onChange={onFrequencyChange}
                    value={frequency}
                    required
                sx={{
                    m: 1,
                    width: "300px"
                }}
            >
                {frequencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
          </div>
          <h5>total amount of time to keep making recurring purchase:</h5>
          <div className="input-line">
            <TextField 
              id="outlined-basic" 
              label="time amount" 
              variant="outlined"
              onChange={onTimeAmtChange}
              value={timeAmt}
              required
              sx={{
                  m: 1,
                  width: "300px"
              }}
            />
            <TextField 
              id="outlined-select"
              select
              label="time period"
              defaultValue=""
              helperText="select time period"
              variant="outlined"
              onChange={onTimePeriodChange}
              value={timePeriod}
              required
              sx={{
                  m: 1
              }}
            >
              {timePeriods.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
