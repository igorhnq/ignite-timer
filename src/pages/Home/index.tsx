import { useContext } from "react";
import { HandPalmIcon, PlayIcon } from "@phosphor-icons/react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { 
    HomeContainer, 
    StartCountdownButton, 
    StopCountdownButton,
} from "./styles";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

interface NewCycleFormData {
    task: string;
    minutesAmount: number;
}

export function Home() {    
    const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext);

    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1, "Informe a tarefa"),
        minutesAmount: zod
            .number()
            .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
            .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
    });
    
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        },
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data);
        reset();
    }
    
    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
                {activeCycle ? (
                    <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
                        <HandPalmIcon size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <PlayIcon size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}