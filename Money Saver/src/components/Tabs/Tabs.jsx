import { useState } from 'react';
import { TabsContext } from './TabsContext.jsx';

export default function Tabs({ children }) {
  const [active, setActive] = useState(null);

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className="tabs-wrapper">
        {children}
      </div>
    </TabsContext.Provider>
  );
}
