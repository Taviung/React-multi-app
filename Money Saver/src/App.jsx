import Tabs from './components/Tabs';
import TabContainer from './components/TabContainer';
import Tab from './components/Tab';
import ActiveTabContent from './components/ActiveContent';
import "./CSS/App.css";
import TodoHome from './components/Todo List/TodoHome';

export default function App() {
  return (
    <Tabs>
      <TabContainer>
        <Tab title="Todo List" initiallyActive>
          <TodoHome />
        </Tab>
        <Tab title="Subscriptions" >
          <p>gg</p>
        </Tab>
        <Tab title="Permissions">
          <div>
            <h3>Permissions</h3>
            <ul>
              <li>Read</li>
              <li>Write</li>
              <li>Execute</li>
            </ul>
          </div>
        </Tab>
      </TabContainer>
      <ActiveTabContent />
  </Tabs>

  );
}
