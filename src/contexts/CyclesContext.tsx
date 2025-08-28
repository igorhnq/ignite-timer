import { createContext, useReducer, useState } from "react";

interface Cycle {   
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    markCurrentCycleAsFinished: () => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
    children: React.ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
        if (action.type === "ADD_NEW_CYCLE") {
            return [...state, action.payload.newCycle]
        }
        return state
    }, [])


    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished() {
        dispatch({
            type: "MARK_CURRENT_CYCLE_AS_FINISHED",
            payload: {
                activeCycleId,
            },
        });

        // setCycles((state) => state.map((cycle) => {
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, finishedDate: new Date() };
        //     }

        //     return cycle;
        // }));

        setActiveCycleId(null);
    }

    function createNewCycle(data: CreateCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        dispatch({
            type: "ADD_NEW_CYCLE",
            payload: {
                newCycle,
            },
        });

        // setCycles((state) => [...state, newCycle]);
        setActiveCycleId(newCycle.id);
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch({
            type: "INTERRUPT_CURRENT_CYCLE",
            payload: {
                activeCycleId,
            },
        });

        // setCycles((state) => state.map((cycle) => {
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, interruptedDate: new Date() };
        //     }
            
        //     return cycle;
        // }));
        
        setActiveCycleId(null);
    }

    return (
        <CyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            setSecondsPassed,
            markCurrentCycleAsFinished,
            createNewCycle,
            interruptCurrentCycle,
        }}>
            {children}
        </CyclesContext.Provider>
    )
}