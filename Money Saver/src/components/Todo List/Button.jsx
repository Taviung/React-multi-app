
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.buttonTextDef};
    border-radius: 50px;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        opacity: .6;
    }
`;

const StyledRedButton = styled(StyledButton)`
  color: ${({ theme }) => theme.buttonTextRed};
`;

const Button = ({ onClick, text}) => {
    return (<StyledButton onClick={onClick}>{text}</StyledButton>);
};

const RedButton= ({ onClick, text}) => {
    return (<StyledRedButton onClick={onClick}>{text}</StyledRedButton>);
};
export {RedButton};
export default Button;
