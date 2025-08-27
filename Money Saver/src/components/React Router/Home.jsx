import styled from "styled-components";

const StyledHome = styled.body`
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
`
export default function Home(){
    return (
        <>
            <StyledHome></StyledHome>
        </>
    )
}