import Tabs from './Tabs.jsx';
import TabContainer from './TabContainer.jsx';
import Tab from './Tab.jsx';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import ActiveTabContent from './ActiveContent.jsx';
import "../../CSS/App.css";
import TodoHome from '../Todo List/TodoHome.jsx';
import {darkTheme, lightTheme} from "../../CSS/theme.js";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }
`;

export default function TabsHome({isDarkMode}) {

  return (
      <>
          <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
              <GlobalStyle />
              <div style={{ padding: '1rem' }}>
                  <Tabs>
                      <TabContainer>
                          <Tab title="Todo List" initiallyActive>
                              <TodoHome />
                          </Tab>
                          <Tab title="Perormance specs">
                              <div>
                                  <h1>Toyota MR2 Spyder (ZZW30 / SW30) </h1>
                                      <p>Engine Code	1ZZ-FE</p>
                                      <p>Engine Type	1.8L Inline-4, DOHC, 16-valve VVT-i</p>
                                      <p>Displacement	1,794 cc</p>
                                      <p>Power Output	~138 hp @ 6,400 rpm (103 kW)</p>
                                      <p>Torque	        ~126 lb-ft @ 4,400 rpm (171 Nm)</p>
                                      <p>Redline	     6,500 rpm</p>
                                      <p>Rev limiter	~6,800 rpm</p>
                                      <p>0–100 km/h 	~6.8–7.5 seconds </p>
                                      <p>Top Speed  	~125 mph (201 km/h)</p>
                                      <p>Transmission Options	5-speed manual </p>
                                      <p>Drivetrain	Mid-engine, Rear-wheel drive (MR)</p>
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
