import logo from './logo.svg'
import styled from "styled-components";

const Img = styled.img`
  height: 8rem;
  pointer-events: none;
`

const Header = styled.header`
  background-color: #282c34;
  min-height: 20vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: white;
`

const H1 = styled.h1`
  font-size: 4rem;
`
export default function ExchangeHeader(props) {
        return (
      <Header>
        <Img src={logo} alt="React logo"/>
        <H1>
          Coin Exchange
        </H1>
      </Header>
        )
}