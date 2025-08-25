import Tabs from './components/Tabs';
import TabContainer from './components/TabContainer';
import Tab from './components/Tab';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import ActiveTabContent from './components/ActiveContent';
import "./CSS/App.css";
import TodoHome from './components/Todo List/TodoHome';
import Button from "./components/Todo List/Button.jsx";
import {useState} from "react";
import {darkTheme, lightTheme} from "./CSS/theme.js";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }
`;

export default function App() {
    const [isDarkMode, setDarkMode] = useState(false);
    function toggleDarkMode() {
        setDarkMode(!isDarkMode);
    }
  return (
      <>
          <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
              <GlobalStyle />
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                  <Button addAction={toggleDarkMode} text={'Turn on/off dark mode'}/>
              </div>
              <div style={{ padding: '1rem' }}>
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
              </div>
          </ThemeProvider>
    </>
  );
}
