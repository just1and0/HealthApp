/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import HeartRate from '../assets/icons/HeartRate';
import BodyTemperature from '../assets/icons/BodyTemperature';
import OxygenSaturation from '../assets/icons/OxygenSaturation';
import BloodPressure from '../assets/icons/BloodPressure';

type IdentifierProps =  string;

const Icons = ({ identifier }: { identifier: IdentifierProps }) => {
    const iconMappings = {
        heartRate: <HeartRate />,
        bodyTemperature: <BodyTemperature />,
        oxygenSaturation: <OxygenSaturation />,
        bloodPressureSystolic: <BloodPressure />,
    };

    const selectedIcon = iconMappings[identifier as keyof typeof iconMappings];
    return (
        <>
            {selectedIcon || <></>}
        </>
    );
};

export default Icons;
