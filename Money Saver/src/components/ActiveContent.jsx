import styled from 'styled-components';

const StyledActiveContent = styled.div`
  color: ${({ theme }) => theme.text};
`;

export default function ActiveContent() {
    return <StyledActiveContent id="ActiveContents" className="tabs-content" />;
}
