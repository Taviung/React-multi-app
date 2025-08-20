import { useTabs } from './TabsContext';

export default function ActiveContent() {
  const { active, tabsData } = useTabs();

  const activeTab = tabsData.find(tab => tab.title === active);

  if (!activeTab) {
    return <div className="tabs-content"><p>Nothing selected.</p></div>;
  }

  return (
    <div className="tabs-content">
      {activeTab.content}
    </div>
  );
}
