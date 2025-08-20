import { useState, useEffect } from 'react';
import { TabsContext } from './TabsContext';
import "../CSS/Tabs.css";

export default function Tabs({ children }) {
  const [tabsData, setTabsData] = useState([]);
  const [active, setActive] = useState(null);

    function registerTab({ title, content, initiallyActive }) {
        setTabsData(prev => {
            const exists = prev.some(tab => tab.title === title);
            if (exists) return prev;
            return [...prev, { title, content, initiallyActive }];
        });
    }

  useEffect(() => {
    if (!active && tabsData.length > 0) {
      const initiallyActiveTab = tabsData.find(tab => tab.initiallyActive);
      setActive(initiallyActiveTab ? initiallyActiveTab.title : tabsData[0].title);
    }
  }, [tabsData, active]);

  return (
    <TabsContext.Provider value={{ active, setActive, tabsData, registerTab }}>
      <div className="tabs-wrapper">
        {children}
      </div>
    </TabsContext.Provider>
  );
}
