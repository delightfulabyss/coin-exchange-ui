import PropTypes from 'prop-types';
import styled from "styled-components";

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding-left: 5rem;
`;

export default function AccountBalance(props){
    const buttonText = props.showBalance ? 'Hide balance' : 'Show balance';
    let content = null;
    if (props.showBalance) {
        content = <>Balance: ${props.amount}</>
        return (
            <Section className="balance">
                {content}
                <button onClick={props.handleBalanceVisibilityChange}>{buttonText}</button>
            </Section>
        );
    } else {
        return (
            <Section className="balance">
                Balance: *******
                <button onClick={props.handleBalanceVisibilityChange}>{buttonText}</button>
            </Section>
        );
    }
}


AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}

