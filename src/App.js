import { useState, useEffect } from "react"
import { FaBitcoin } from "react-icons/fa"
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material/styles"
import {
  Button,
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
  const [dollarAmt, setDollarAmt] = useState("")
  const [frequency, setFrequency] = useState("")
  const [timeAmt, setTimeAmt] = useState("")
  const [timePeriod, setTimePeriod] = useState("")
  const [price, setPrice] = useState("")
  const [btcPrice, setBtcPrice] = useState("")
  const [dollarPrice, setDollarPrice] = useState("")
  
  const currentPrice = coin

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

  const onDollarAmtChange = (e) => {
    setDollarAmt(e.target.value)
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

  const onPriceChange = (e) => {
    setPrice(e.target.value)
  }

  const onCurrentPriceChange = () => {
    setPrice(currentPrice)
  }

  const dollarAmtNum = parseFloat(dollarAmt)
  let btcTotal = ""
  let dollarTotal = ""

  const calculateTotal = () => {
    if (frequency === "once per day" && timePeriod === "days") {
      btcTotal = ((dollarAmtNum * timeAmt * 1).toFixed(2) / price).toFixed(8)
      dollarTotal = ((dollarAmtNum * timeAmt * 1).toFixed(2))
    } else if (frequency === "once per day" && timePeriod === "weeks") {
      btcTotal = ((dollarAmtNum * timeAmt * 7).toFixed(2) / price).toFixed(8)
      dollarTotal = ((dollarAmtNum * timeAmt * 7).toFixed(2))
    } else if (frequency === "once per day" && timePeriod === "months") {
      btcTotal = ((dollarAmtNum * timeAmt * 30).toFixed(2) / price).toFixed(8)
      dollarTotal = ((dollarAmtNum * timeAmt * 30).toFixed(2))
    } else if (frequency === "once per day" && timePeriod === "years") {
      btcTotal = ((dollarAmtNum * timeAmt * 365).toFixed(2) / price).toFixed(8)
      dollarTotal = ((dollarAmtNum * timeAmt * 365).toFixed(2))
    } else if (frequency === "once per week" && timePeriod === "weeks") {
      btcTotal = ((dollarAmtNum * timeAmt * 1).toFixed(2) / price).toFixed(8)
      dollarTotal = ((dollarAmtNum * timeAmt * 1).toFixed(2))
    } else if (frequency === "once per week" && timePeriod === "months") {
      btcTotal = ((dollarAmtNum * timeAmt * 4.28).toFixed(2) / price).toFixed(8)
      dollarTotal = ((dollarAmtNum * timeAmt * 4.28).toFixed(2))
    } else if (frequency === "once per week" && timePeriod === "years") {
      btcTotal = ((dollarAmtNum * timeAmt * 52).toFixed(2) / price).toFixed(8)
      dollarTotal = ((dollarAmtNum * timeAmt * 52).toFixed(2))
    } else if (frequency === "once per month" && timePeriod === "months") {
      btcTotal = ((dollarAmtNum * timeAmt * 1).toFixed(2) / price).toFixed(8)
      dollarTotal = ((dollarAmtNum * timeAmt * 1).toFixed(2))
    } else if (frequency === "once per month" && timePeriod === "years") {
      btcTotal = ((dollarAmtNum * timeAmt * 12).toFixed(2) / price).toFixed(8)
      dollarTotal = ((dollarAmtNum * timeAmt * 12).toFixed(2))
    }
  }

  calculateTotal()

  const handleClick = () => {
    setBtcPrice(btcTotal)
    setDollarPrice(dollarTotal)
  }

  useEffect(() => {
    axios.get("/coins/bitcoin").then((response) => {
      setCoin(response.data.market_data.current_price.usd)
      // console.log(response.data.market_data.current_price.usd)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  console.log(btcTotal)

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="header">
          <div className="logo">
            <div className="logo-icon">
              <FaBitcoin size="auto" style={{ marginRight: "10px", color: "#F2A900"}}/>
            </div>
            <h2>Bitcoin Budget</h2>
          </div>
          <div className="btc-price">
            <h4>Current <FaBitcoin size="18px" style={{ margin: "0px 10px", color: "#F2A900"}}/> Price:</h4>
            <h4>${currentPrice}</h4>
          </div>
        </header>
        <div className="container">
          <h5>amount you would like to purchase on a recurring basis:</h5>
          <div className="input-line">
            <TextField 
              id="outlined-basic" 
              label="dollar amount"
              variant="outlined"
              onChange={onDollarAmtChange}
              value={dollarAmt}
              required
              sx={{
                  m: 0.2,
                  width: {
                    xs: "180px",
                    sm: "300px"
                  }
              }}
            />
          </div>
          <h5>frequency rate to make recurring purchase:</h5>
          <div className="input-line">
            <TextField 
                id="outlined-select"
                select
                label="frequency"
                defaultValue=""
                variant="outlined"
                onChange={onFrequencyChange}
                    value={frequency}
                    required
                sx={{
                    m: 0.2,
                    width: {
                      xs: "180px",
                      sm: "300px"
                    }
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
                  m: 0.2,
                  width: {
                    xs: "180px",
                    sm: "300px"
                  }
              }}
            />
            <TextField 
              id="outlined-select"
              select
              label="time period"
              defaultValue=""
              variant="outlined"
              onChange={onTimePeriodChange}
              value={timePeriod}
              required
              sx={{
                  m: 0.2,
                  width: {
                    xs: "100px",
                    sm: "150px"
                  }
              }}
            >
              {timePeriods.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <h5>at average price of:</h5>
          <div className="price-input-line">
            <TextField 
              label="enter target BTC price"
              onChange={onPriceChange}
              value={price}
            />
            <Button
              value={currentPrice}
              onClick={onCurrentPriceChange}
              sx={{
                m: 1,
                px: 2,
                backgroundColor: "white",
                color: "#F2A900",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                  "&.Mui-disabled": {
                    background: "white",
                    color: "grey"
                  }
              }}
            >
              use current <FaBitcoin size="20px" style={{ margin: "10px", color: "#F2A900"}}/> price
            </Button>
          </div>
          <div className="total-line">
            <Button
              onClick={handleClick}
              sx={{
                m: 1,
                px: 2,
                backgroundColor: "#F2A900",
                color: "white",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#F2A900",
                  },
                  "&.Mui-disabled": {
                    background: "white",
                    color: "grey"
                  }
              }}
            >
              Calculate
            </Button>
            <h4>total:</h4>
            <>
              <div className="btc-total">
                <FaBitcoin size="20px" style={{ marginRight: "10px", color: "#F2A900"}}/>
                <p>{ btcPrice }</p>
              </div>
              <div className="btc-total">
                <p>$ { dollarPrice }</p>
              </div>
            </>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
