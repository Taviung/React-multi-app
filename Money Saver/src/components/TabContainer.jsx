import { useTabs } from './TabsContext';
import "../CSS/Tabs.css";

export default function TabContainer({ children }) {
  const { tabsData, active, setActive } = useTabs();

  return (
    <div>
      <div className="tab-headers">
        {tabsData.map(tab => (
          <button
            key={tab.title}
            className={tab.title === active ? 'active' : ''}
            onClick={() => setActive(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
