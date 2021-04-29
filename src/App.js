import React, {useState, useEffect} from 'react'
import axios from 'axios';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList'
import ExchangeHeader from './components/Header/Header'
import styled from "styled-components"

const Div = styled.div`
  text-align: center;
  background-color: royalblue;
  color: #ccc;
`;

const COIN_COUNT = 10
const formatPrice = price => parseFloat(Number(price).toFixed(4))
  
function App (props) {

  const [balance, setBalance] = useState(10000)
  const [showBalance, setShowBalance] = useState(true)
  const [coinData, setCoindata] = useState([])


  const componentDidMount = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins')

    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id)
    //Retrieve price for each coin
    const tickerURL = 'https://api.coinpaprika.com/v1/tickers/'
    const promises = coinIds.map(id => axios.get(tickerURL + id))
    const coinData = await Promise.all(promises)
    const newCoinData = coinData.map(response => {
      const coin = response.data
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes['USD'].price)
      }
    })
    setCoindata(newCoinData)
  }

  const handleBalanceVisibilityChange = () => {
      setShowBalance(oldState => !oldState)
    }

  useEffect(() => {
    if (coinData.length === 0) {
      // component did mount
      componentDidMount()
    }
  })
  const handleRefresh = async (valueChangeId) => {
    const tickerURL = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`
    const response = await axios.get(tickerURL)
    const newPrice = formatPrice(response.data.quotes['USD'].price)
    const newCoinData = coinData.map((values) => {
      let newValues = { ...values };
      if (valueChangeId === values.key) {
        newValues.price = newPrice
      }
      return newValues;
    });
    setCoindata(newCoinData)
  }
    return(
      <Div className="App">
        <ExchangeHeader/>
        <AccountBalance
          amount={balance}
          showBalance={showBalance}
          handleBalanceVisibilityChange={handleBalanceVisibilityChange} />
        <CoinList coinData={coinData}
          showBalance={showBalance}
          handleRefresh={handleRefresh}
          />
    </Div>
  );
}

export default App;

//Hide and show USD balance and balance column