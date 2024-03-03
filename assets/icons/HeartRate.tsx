import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const HeartRate = () => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 64 64"
    >
        <G fill="none" fillRule="evenodd">
            <Path
                fill="#F16963"
                d="m31 17 2.101-1.9c5.466-5.466 14.332-5.466 19.798 0 5.468 5.469 5.467 14.333 0 19.798L31 57 9.101 34.9c-5.467-5.466-5.468-14.33 0-19.799 5.466-5.466 14.332-5.466 19.798 0L31 17Z"
            />
            <Path
                stroke="#414547"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m31 17 2.101-1.9c5.466-5.466 14.332-5.466 19.798 0 5.468 5.469 5.467 14.333 0 19.798L31 57 9.101 34.9c-5.467-5.466-5.468-14.33 0-19.799 5.466-5.466 14.332-5.466 19.798 0L31 17Z"
            />
            <Path
                stroke="#414547"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 35h7l3-12 5 22 4-14 2 4h15"
            />
        </G>
    </Svg>
)
export default HeartRate
