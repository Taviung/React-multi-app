import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './CSS/theme.js';
import Button from './components/Todo List/Button.jsx';
import About from './components/React Router/About.jsx';
import TabsHome from './components/Tabs/TabsHome.jsx';
import TaskDetail from './components/Todo List/TaskDetail.jsx';
import Home from './components/React Router/Home.jsx';
import ReduxEditTask from './components/Todo List/ReduxEditTask.jsx';
import { ActivityProvider } from './components/Todo List/ActivityContext.jsx';
import AddForm from "./components/Todo List/AddForm.jsx";
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
    form: formReducer,
});

const store = createStore(rootReducer);

function RootLayout({ toggleDarkMode }) {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                <Button onClick={toggleDarkMode} text={'Turn on/off dark mode'} />
            </div>
                <nav>
                    <Link to="/">Home</Link> {"|"}
                    <Link to="/about">About</Link>{"|"}
                    <Link to="/todos">Todos</Link>
                </nav>
            <Outlet />
        </>
    );
}

export default function App() {
    const [isDarkMode, setDarkMode] = useState(false);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<RootLayout toggleDarkMode={() => setDarkMode(!isDarkMode)} />}>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="todos" element={<TabsHome isDarkMode={isDarkMode} />}>
                    <Route path="add" element={<AddForm />} />
                    <Route path=":id" element={<TaskDetail />} />
                    <Route path="edit/:id" element={<ReduxEditTask />} />
                </Route>
            </Route>
        )
    );

    return (
        <Provider store={store}>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <ActivityProvider>
                    <RouterProvider router={router} />
                </ActivityProvider>
            </ThemeProvider>
        </Provider>
    );

}
