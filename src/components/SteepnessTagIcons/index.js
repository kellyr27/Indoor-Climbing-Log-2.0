import { SlabSVG, VerticalSVG, OverhungSVG, RoofSVG } from '../../assets/steepnessTypeIcons'

const SteepnessTagIcons = ({ steepness, width = 30, height = 30 }) => {
    const steepnessIcons = {
        slab: <SlabSVG width={width} height={height} />,
        vertical: <VerticalSVG width={width} height={height} />,
        overhung: <OverhungSVG width={width} height={height} />,
        roof: <RoofSVG width={width} height={height} />,
    };

    return steepnessIcons[steepness];
}

export default SteepnessTagIcons;