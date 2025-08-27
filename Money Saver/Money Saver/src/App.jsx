import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './CSS/theme.js';
import Button from './components/Todo List/Button.jsx';
import About from './components/React Router/About.jsx';
import TabsHome from './components/Tabs/TabsHome.jsx';
import TaskDetail from './components/Todo List/TaskDetail.jsx';
import Home from './components/React Router/Home.jsx';
import EditTask from './components/Todo List/EditTask.jsx';
import { ActivityProvider } from './components/Todo List/ActivityContext.jsx';

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
                    <Route path=":id" element={<TaskDetail />} />
                    <Route path="edit/:id" element={<EditTask />} />
                </Route>
            </Route>
        )
    );

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <ActivityProvider>
                <RouterProvider router={router} />
            </ActivityProvider>
        </ThemeProvider>
    );
}
