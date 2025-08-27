import { createContext, useContext, useEffect, useState } from "react";

const ActivityContext = createContext();

const getInitialActivities = () => {
    const saved = localStorage.getItem("activities");
    if (saved) {
        return JSON.parse(saved);
    } else {
        return [
            { id: 1, task: "Complete React project", creationDate: "2025-08-05", endDate: "2025-10-05" },
            { id: 2, task: "Write documentation", creationDate: "2025-09-05", endDate: "2025-09-05" },
            { id: 3, task: "Deploy application", creationDate: "2025-09-05", endDate: "2025-12-30" }
        ];
    }
};

export const ActivityProvider = ({ children }) => {
    const [activity, setActivity] = useState(getInitialActivities);

    useEffect(() => {
        localStorage.setItem("activities", JSON.stringify(activity));
    }, [activity]);

    return (
        <ActivityContext.Provider value={{ activity, setActivity }}>
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivity = () => useContext(ActivityContext);
