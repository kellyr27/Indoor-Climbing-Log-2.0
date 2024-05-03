import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from "../../assets/tickTypeIcons/index";

const TickTypeIcon = ({ tickType, style }) => {
    const tickTypeIcons = {
        flash: <FlashSVG style={style} />,
        redpoint: <RedpointSVG style={style} />,
        hangdog: <HangdogSVG style={style} />,
        attempt: <AttemptSVG style={style} />,
    };

    return tickTypeIcons[tickType];
}

export default TickTypeIcon;