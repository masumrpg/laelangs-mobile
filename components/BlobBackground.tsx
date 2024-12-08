import React, { useState, useEffect } from "react";
import {
    Canvas,
    Circle,
    LinearGradient,
    vec,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const BlobBackground = () => {
    const [positions, setPositions] = useState([
        { cx: width / 2 - 150, cy: height / 2 - 150, r: 70 },
        { cx: width / 2 + 150, cy: height / 2 - 150, r: 70 },
        { cx: width / 2 - 100, cy: height / 2 + 50, r: 70 },
        { cx: width / 2 + 100, cy: height / 2 + 50, r: 70 },
    ]);

    useEffect(() => {
        let startTime = Date.now();

        const updatePositions = () => {
            const currentTime = Date.now() - startTime;

            setPositions((prevPositions) =>
                prevPositions.map((pos, index) => {
                    const newCx = pos.cx + Math.sin(currentTime / 600 + index) * 2;

                    const newCy = pos.cy + Math.cos(currentTime / 800 + index) * 2;

                    return {
                        cx: newCx,
                        cy: newCy,
                        r: pos.r,
                    };
                }),
            );
        };

        const interval = setInterval(updatePositions, 16);

        return () => clearInterval(interval);
    }, []);

    return (
        <Canvas style={{ flex: 1, width, height, position: "absolute" }}>
            {positions.map((position, index) => (
                <Circle key={index} cx={position.cx} cy={position.cy} r={position.r}>
                    <LinearGradient
                        start={vec(0, 0)}
                        end={vec(256, 256)}
                        colors={["green", "cyan"]}
                    />
                </Circle>
            ))}
        </Canvas>
    );
};

export default BlobBackground;
