import { useState, useEffect } from "react"
import { FaBitcoin } from "react-icons/fa"
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material/styles"
import {
  Button,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
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

  const dollarAmtNum = parseFloat(dollarAmt)
  let btcTotal = ""
  let dollarTotal = ""

  const calculateTotal = () => {
    if (frequency === "once per day" && timePeriod === "days") {
      btcTotal = ((dollarAmtNum * timeAmt * 1).toFixed(2) / price)
      dollarTotal = ((dollarAmtNum * timeAmt * 1).toFixed(2))
    } else if (frequency === "once per day" && timePeriod === "weeks") {
      return (dollarAmtNum * timeAmt * 7).toFixed(2)
    } else if (frequency === "once per day" && timePeriod === "months") {
      return (dollarAmtNum * timeAmt * 30).toFixed(2)
    } else if (frequency === "once per day" && timePeriod === "years") {
      return (dollarAmtNum * timeAmt * 365).toFixed(2)
    } else if (frequency === "once per week" && timePeriod === "weeks") {
      return (dollarAmtNum * timeAmt * 1).toFixed(2)
    } else if (frequency === "once per week" && timePeriod === "months") {
      return (dollarAmtNum * timeAmt * 4.28).toFixed(2)
    } else if (frequency === "once per week" && timePeriod === "years") {
      return (dollarAmtNum * timeAmt * 52).toFixed(2)
    } else if (frequency === "once per month" && timePeriod === "months") {
      return (dollarAmtNum * timeAmt * 1).toFixed(2)
    } else if (frequency === "once per month" && timePeriod === "years") {
      return (dollarAmtNum * timeAmt * 12).toFixed(2)
    } 
  }

  console.log(calculateTotal())

  useEffect(() => {
    axios.get("/coins/bitcoin").then((response) => {
      setCoin(response.data.market_data.current_price.usd)
      console.log(response.data.market_data.current_price.usd)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

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
          <h5>at price of:</h5>
          <div className="input-line">
            <FormControl
              sx={{
                width: 1
              }}
            >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                sx={{
                  width: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <FormControlLabel 
                  control={<Radio />}
                  value={currentPrice} 
                  label={"current BTC price"}
                  id="current-price"
                  sx={{
                      m: 0.2,
                      mb: "20px"
                  }}
                />
                <FormControlLabel 
                  control={<Radio sx={{ mb: "20px" }} />} 
                  value={price}
                  label={<TextField 
                            label="enter target BTC price"
                            helperText="target btc price"
                            onChange={onPriceChange}
                            value={price}
                        />}
                  id="target-price"
                  sx={{
                      m: 0.2,
                      width: {
                        xs: "120px",
                        sm: "190px"
                      }
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="total-line">
            <Button
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
            {
              isNaN(btcTotal) ? ("") :
              (
                <>
                  <div className="btc-total">
                    <FaBitcoin size="20px" style={{ marginRight: "10px", color: "#F2A900"}}/>
                    <p>{ btcTotal }</p>
                  </div>
                  <div className="btc-total">
                    <p>$ { dollarTotal }</p>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
