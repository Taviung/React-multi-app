import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { useTabs } from './TabsContext';
import "../CSS/Tabs.css";

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
      <button
        className={id === active ? 'active' : ''}
        onClick={() => setActive(id)}
      >
        {title}
      </button>

      {id === active ? createPortal(children, document.getElementById('ActiveContents')) : null}
    </>
  );
}
