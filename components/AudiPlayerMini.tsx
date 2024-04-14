'use client'

import React, {useEffect, useState} from "react";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import PlayPause from "public/images/play-pause.json";

export const AudiPlayerMini = ({audioName, blockName}: {audioName: string, blockName: string }) => {

    const lottieRef = React.useRef<LottieRefCurrentProps>(null)

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const handleToggleClick = () => {
        setIsAudioPlaying(!isAudioPlaying);
    };

    useEffect(() => {
        if (lottieRef && lottieRef.current) {
            // lottieRef.current.play();
            lottieRef.current.goToAndStop(14, true);
            if (isAudioPlaying) {
                lottieRef.current.playSegments([14, 27], true);
            } else {
                lottieRef.current.playSegments([0, 14], true);
            }
        }
    });


    return (
        <div className="d-flex flex-column align-items-start">
            <i>{blockName}</i>
            <audio id="usaAudio" preload="auto">
                <source src={'/api/audio/' + audioName} type="audio/mpeg"/>
            </audio>
            <div onClick={handleToggleClick} className="play__button">
                <Lottie
                    lottieRef={lottieRef}
                    animationData={PlayPause}
                    autoplay={false}
                    loop={false}
                    style={{width: '100%', height: '100%'}}
                    // initialSegment={play}
                />
            </div>
        </div>
    );
};