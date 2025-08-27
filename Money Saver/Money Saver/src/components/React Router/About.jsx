import styled from 'styled-components'

const StyledAbout= styled.body`

        background: ${({ theme }) => theme.background};
        color: ${({theme})=>theme.text};
`

export default function About(){
    return (
        <StyledAbout>
            <h1>About Page</h1>
        </StyledAbout>
    );
}