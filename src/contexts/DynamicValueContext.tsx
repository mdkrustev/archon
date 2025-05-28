// context/DynamicValueContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";

export type DynamicValueKey = 'openLoginForm' | 'openAddWorkTypeForm' | 'notificationMessage';

interface DynamicValues {
    openLoginForm?: boolean;
    openAddWorkTypeForm?: boolean
    notificationMessage?: string;
}

interface DynamicValueContextType {
    values: DynamicValues;
    setValue: <K extends DynamicValueKey>(key: K, value: DynamicValues[K]) => void;
    removeValue: (key: DynamicValueKey) => void;
}

const DynamicValueContext = createContext<DynamicValueContextType | undefined>(undefined);

export const useDynamicValue = () => {
    const context = useContext(DynamicValueContext);
    if (!context) {
        throw new Error("useDynamicValue must be used within a DynamicValueProvider");
    }
    return context;
};

export const DynamicValueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [values, setValues] = useState<DynamicValues>({});

    useEffect(() => {
        console.log(values)
    }, [values])
    const setValue = <K extends DynamicValueKey>(key: K, value: DynamicValues[K]) => {
        setValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const removeValue = (key: DynamicValueKey) => {
        const { [key]: _, ...rest } = values;
        setValues(rest);
    };

    const contextValue = {
        values,
        setValue,
        removeValue,
    };

    return (
        <DynamicValueContext.Provider value={contextValue}>
            {children}
        </DynamicValueContext.Provider>
    );
};