import styled from 'styled-components';

const StyledInput = styled.input`
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputText};
    border: none;
    padding: 10px 14px;
    font-size: 1rem;
    border-radius: 50px;
    width: 10%;
    margin-bottom: 10px;
    margin-right: 10px;

    &::placeholder {
        color: ${({ theme }) => theme.inputPlaceholder};
    }
`;

const InputField = ({ headerText, value, type, onChange }) => {
    return (
        <StyledInput
            type={type}
            value={value}
            id={headerText}
            name={headerText}
            onChange={onChange}
            placeholder={headerText}
        />
    );
};

export default InputField;
