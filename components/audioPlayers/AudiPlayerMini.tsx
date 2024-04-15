'use client'

import React, {useEffect, useRef, useState} from "react";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import PlayPause from "public/images/play-pause.json";
import "./player.style.css";

export const AudiPlayerMini = ({audioSource, blockName}: {audioSource: string, blockName: string }) => {

    const audioRef = useRef<HTMLAudioElement>(null);

    const lottieRef = useRef<LottieRefCurrentProps>(null)

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const handleToggleClick = () => {
        setIsAudioPlaying(!isAudioPlaying);

    };

    useEffect(() => {
        const audioElement = document.getElementById('audio') as HTMLAudioElement;
        if (lottieRef && lottieRef.current) {
            lottieRef.current.goToAndStop(14, true);
            if (isAudioPlaying) {
                lottieRef.current.playSegments([14, 27], true);
                if(audioRef.current) audioRef.current.play();

            } else if(!isAudioPlaying){
                lottieRef.current.playSegments([0, 14], true);
                if(audioRef.current) audioRef.current.pause();
            }
        }
    });

    const handleAudioEnded = () => {
        setIsAudioPlaying(false);
    };

    return (
        <div className="d-flex flex-column align-items-start player">
            <i>{blockName}</i>
            <audio ref={audioRef} preload="auto" onEnded={handleAudioEnded}>
                <source src={audioSource} type="audio/mpeg"/>
            </audio>
            <div onClick={handleToggleClick} className="play__button">
                <Lottie
                    lottieRef={lottieRef}
                    animationData={PlayPause}
                    autoplay={false}
                    loop={false}
                    style={{width: '100%', height: '100%'}}
                />
            </div>
        </div>
    );
};