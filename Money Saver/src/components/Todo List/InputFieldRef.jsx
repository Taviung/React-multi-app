import styled from 'styled-components';
import React from 'react';

const StyledInput = styled.input`
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputText};
    padding: 10px 40px;
    font-size: 1rem;
    border-radius: 50px;
    width: 200px;
    margin-bottom: 10px;
    margin-right: 10px;

    &::placeholder {
        color: ${({ theme }) => theme.inputPlaceholder};
    }
`;

const InputFieldRef = React.forwardRef(({ headerText, ...rest }, ref) => {
    return (
        <StyledInput
            ref={ref}
            id={rest.name || headerText}
            placeholder={headerText}
            {...rest}
        />
    );
});

export default InputFieldRef;
