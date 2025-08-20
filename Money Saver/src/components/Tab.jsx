import { useEffect } from 'react';
import { useTabs } from './TabsContext';
import "../CSS/Tabs.css";

export default function Tab({ title, children, initiallyActive }) {
  const { registerTab } = useTabs();

  useEffect(() => {
    registerTab({ title, content: children, initiallyActive });
  }, [title, children, initiallyActive, registerTab]);
  return null;
}
