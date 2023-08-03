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
  const [currencyAmt, setCurrencyAmt] = useState("")
  const [currency, setCurrency] = useState("")
  const [frequency, setFrequency] = useState("")
  const [timeAmt, setTimeAmt] = useState("")
  const [timePeriod, setTimePeriod] = useState("")
  const [price, setPrice] = useState("")
  
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

  const onPriceChange = (e) => {
    setPrice(e.target.value)
}

  const currAmtNum = parseFloat(currencyAmt)
  const timeAmtNum = parseFloat(timeAmt)
  const priceNum = parseFloat(price)

  const calculateTotal = () => {
    // return currAmtNum * timeAmtNum * priceNum
    if (frequency === "once per day" && timePeriod === "days") {
      return (currAmtNum * timeAmt * 1).toFixed(2)
    } else if (frequency === "once per day" && timePeriod === "weeks") {
      return (currAmtNum * timeAmt * 7).toFixed(2)
    } else if (frequency === "once per day" && timePeriod === "months") {
      return (currAmtNum * timeAmt * 30).toFixed(2)
    } else if (frequency === "once per day" && timePeriod === "years") {
      return (currAmtNum * timeAmt * 365).toFixed(2)
    } else if (frequency === "once per week" && timePeriod === "weeks") {
      return (currAmtNum * timeAmt * 1).toFixed(2)
    } else if (frequency === "once per week" && timePeriod === "months") {
      return (currAmtNum * timeAmt * 4.28).toFixed(2)
    } else if (frequency === "once per week" && timePeriod === "years") {
      return (currAmtNum * timeAmt * 52).toFixed(2)
    } else if (frequency === "once per month" && timePeriod === "months") {
      return (currAmtNum * timeAmt * 1).toFixed(2)
    } else if (frequency === "once per month" && timePeriod === "years") {
      return (currAmtNum * timeAmt * 12).toFixed(2)
    } 
  }

  console.log(calculateTotal())

  const total = calculateTotal()

  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=1&page=1&sparkline=false&locale=en&precision=2"

  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     setCoin(response.data)
  //     console.log(response.data[0])
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, [])

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
            <h4>${}</h4>
          </div>
        </header>
        <div className="container">
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
                label="currency"
                defaultValue=""
                helperText="btc or usd"
                variant="outlined"
                onChange={onCurrencyChange}
                value={currency}
                required
                sx={{
                    m: 0.2,
                    width: {
                      xs: "100px",
                      sm: "150px"
                    }
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
                  value="current-btc-price" 
                  control={<Radio />} 
                  label={"current BTC price"}
                  sx={{
                      m: 0.2,
                      mb: "20px"
                  }}
                />
                <FormControlLabel 
                  control={<Radio sx={{ mb: "20px" }} />} 
                  label={<TextField 
                            label="enter target BTC price"
                            helperText="target btc price"
                            onChange={onPriceChange}
                            value={price}
                        />}
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
            <p>${
              isNaN(total) ? "" : total 
            }</p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
