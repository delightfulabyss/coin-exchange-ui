import PropTypes from 'prop-types';
import styled from 'styled-components';

const Td = styled.td`
    border: 1px solid #ccc;
    width 25vh;
`;

export default function Coin(props) {

   const handleClick = (event) => {
        event.preventDefault();
        props.handleRefresh(props.tickerId);
    }
        return (
            <tr>
                <Td>{props.name}</Td>
                <Td>{props.ticker}</Td>
                <Td>${props.price}</Td>
                {props.showBalance ? <Td>{props.balance} {props.ticker}</Td> : null}
                <Td>
                    <form action="#" method="#">
                        <button onClick={handleClick}>Refresh</button>
                    </form>
                </Td>
            </tr>
        )
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    balance: PropTypes.number
}