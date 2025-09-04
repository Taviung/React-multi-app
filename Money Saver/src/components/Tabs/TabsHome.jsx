import Tabs from './Tabs.jsx';
import TabContainer from './TabContainer.jsx';
import Tab from './Tab.jsx';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import ActiveTabContent from './ActiveContent.jsx';
import "../../CSS/App.css";
import TodoHome from '../Todo List/TodoHome.jsx';
import {darkTheme, lightTheme} from "../../CSS/theme.js";
import {FormattedMessage, IntlProvider} from "react-intl";
import en from "../../assets/langauge/en-US.json"
import fr from "../../assets/langauge/fr.json"
import de from "../../assets/langauge/de.json"
import {useState} from "react";
import InputField from "../Todo List/InputFiled.jsx";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }
`;

export default function TabsHome({isDarkMode}) {
    const [noOfCars, setNoOfCars] = useState(0);
    const messages = {
        "en-US": en,
        "fr": fr,
        "de": de
    };
  return (
      <>
          <IntlProvider locale={navigator.language} messages={messages[navigator.language]}>
              <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                  <GlobalStyle />
                  <div style={{ padding: '1rem' }}>
                      <Tabs>
                          <TabContainer>
                              <Tab title="Todo List" initiallyActive>
                                  <TodoHome />
                              </Tab>
                              <Tab title="Performance specs">
                                  <div>
                                      <h1><FormattedMessage id="title" /></h1>
                                      <p><FormattedMessage id="engineCode" /></p>
                                      <p><FormattedMessage id="engineType" /></p>
                                      <p><FormattedMessage id="displacement" /></p>
                                      <p><FormattedMessage id="power" /></p>
                                      <p><FormattedMessage id="torque" /></p>
                                      <p><FormattedMessage id="redline" /></p>
                                      <p><FormattedMessage id="revLimiter" /></p>
                                      <p><FormattedMessage id="acceleration" /></p>
                                      <p><FormattedMessage id="topSpeed" /></p>
                                      <p><FormattedMessage id="transmission" /></p>
                                      <p><FormattedMessage id="drivetrain" /></p>
                                      <InputField type={"number"} headerText={"Number of cars"} onChange={(e)=>setNoOfCars(e.target.value)} value={noOfCars} />
                                      <FormattedMessage id="itemCount" values={{ count: Number(noOfCars) }} />
                                  </div>
                              </Tab>
                          </TabContainer>
                          <ActiveTabContent />
                      </Tabs>
                  </div>
              </ThemeProvider>
          </IntlProvider>
    </>
  );
}
