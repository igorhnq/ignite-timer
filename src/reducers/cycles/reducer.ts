import { useReducer } from "react";
import { produce } from "immer";
import { CyclesActionTypes } from "./actions";

export interface Cycle {   
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any)  {
    const [cyclesState, dispatch] = useReducer(
        (state: CyclesState, action: any) => {
            switch (action.type) {
                case CyclesActionTypes.ADD_NEW_CYCLE:
                   return produce(state, (draft) => {
                    draft.cycles.push(action.payload.newCycle)
                    draft.activeCycleId = action.payload.newCycle.id
                })
                case CyclesActionTypes.INTERRUPT_CURRENT_CYCLE: {
                    const currentCycleIndex = state.cycles.findIndex((cycle) => cycle.id === state.activeCycleId)
                    if (currentCycleIndex < 0) return state

                    return produce(state, (draft) => {
                        draft.activeCycleId = null
                        draft.cycles[currentCycleIndex].interruptedDate = new Date()
                    })
                }
                case CyclesActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
                    const currentCycleIndex = state.cycles.findIndex((cycle) => cycle.id === state.activeCycleId)
                    if (currentCycleIndex < 0) return state

                    return produce(state, (draft) => {
                        draft.activeCycleId = null
                        draft.cycles[currentCycleIndex].finishedDate = new Date()
                    })
                }
                default:
                    return state;
            }
        },
        {
            cycles: [],
            activeCycleId: null,
        }
    )
}