import { useState } from "react";

import bugImageUrl from "../assets/bug.svg";
import ideaImageUrl from "../assets/idea.svg";
import thoughtImageUrl from "../assets/thought.svg";

import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep"
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { CloseButton } from "../CloseButton";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEIA: {
        title: "Ideia",
        image: {
            source: ideaImageUrl,
            alt: "imagem de uma lampada"
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtImageUrl,
            alt: "imagem de uma nuvem"
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {


    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedbackType(null)
        setFeedbackSent(false)
    }
    return (


        <>


            <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
                <header>
                    <span className="text-xl leading-6">Deixe seu feedback</span>

                    <CloseButton />
                </header>

                {feedbackSent ? (
                    <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
                ) : (
                    <>
                        {!feedbackType ? (
                            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                        ) : (
                            <FeedbackContentStep
                                feedbackType={feedbackType}
                                onFeedbackRestartRequested={handleRestartFeedback}
                                onFeedbackSent={() => setFeedbackSent(true)}
                            />

                        )}</>)}





                <footer className="text-xs text-neutral-400">
                    Feito com amor pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
                </footer>
            </div></>





    )
}