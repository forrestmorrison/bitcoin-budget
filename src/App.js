import { useState, useEffect } from "react"
import { FaBitcoin } from "react-icons/fa"
import axios from "axios";

function App() {
  const [coin, setCoin] = useState([])
  const currentPrice = coin[0]

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
    <div className="App">
      <div className="container">
        <header className="header">
            <FaBitcoin size="60px" style={{ margin: "10px", marginTop: "12px", color: "#F2A900"}}/>
            Bitcoin Budget
        </header>
        <div className="btc-price">
          <h4>Current <FaBitcoin size="18px" style={{ margin: "0px 10px", color: "#F2A900"}}/> Price:</h4>
          <h4>${currentPrice.current_price}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
