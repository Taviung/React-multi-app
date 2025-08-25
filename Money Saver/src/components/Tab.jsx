import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { useTabs } from './TabsContext';
import styled from 'styled-components';

const TabButton = styled.button`
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.text};
    padding: 10px 10vw;
    cursor: pointer;
    font-size: 16px;
    transition: border-bottom 0.3s ease, color 0.3s ease;

    &.active {
        border-bottom: 3px solid ${({ theme }) => theme.activeTabBorder || 'blue'};
    }

    &:hover {
        opacity: 0.6;
    }
`;

export default function Tab({ title, children, initiallyActive }) {
    const { active, setActive } = useTabs();
    const id = useId();

    useEffect(() => {
        if (initiallyActive && !active) {
            setActive(id);
        }
    }, [id, initiallyActive, active, setActive]);

    return (
        <>
            <TabButton
                className={id === active ? 'active' : ''}
                onClick={() => setActive(id)}
            >
                {title}
            </TabButton>

            {id === active
                ? createPortal(children, document.getElementById('ActiveContents'))
                : null}
        </>
    );
}
