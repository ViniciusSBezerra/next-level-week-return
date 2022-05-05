import { Camera, Trash } from "phosphor-react";

import html2cavas from "html2canvas"

import { useState } from "react";

import { LoadingButton } from "../LoadingButton";




interface ScreenshotButtonProps{
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton( {screenshot, onScreenshotTook}: ScreenshotButtonProps) {

    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true);

        const canvas = await html2cavas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png');

        console.log(base64image)
       
        onScreenshotTook(base64image)

        setIsTakingScreenshot(false)
    }

    if(screenshot){
        return (
            <button
                onClick={() => onScreenshotTook(null)}
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'rigth bottom',
                    backgroundSize: 100

                }}            
            >

                <Trash weight="fill"/>
            </button>
        )
    }
    return (

        <button
            onClick={handleTakeScreenshot} type="button" className="p-2 bg-zinc-800 rounde-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"

        >
            {isTakingScreenshot ? <LoadingButton /> : <Camera className="w-6 h-6" />}

        </button>


    )
}