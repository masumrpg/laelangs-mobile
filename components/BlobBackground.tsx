import React, { useState, useEffect } from "react";
import {
    Canvas,
    Circle,
    LinearGradient,
    vec,
    BackdropFilter,
    Blur,
    ColorMatrix,
    rect,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

// Mendapatkan dimensi layar perangkat
const { width, height } = Dimensions.get("window");

const BlobBackground = () => {
    const [positions, setPositions] = useState([
        { cx: width / 2 - 150, cy: height / 2 - 150, r: 70 },  // Lingkaran pertama
        { cx: width / 2 + 150, cy: height / 2 - 150, r: 70 },  // Lingkaran kedua
        { cx: width / 2 - 100, cy: height / 2 + 50, r: 70 },   // Lingkaran ketiga
        { cx: width / 2 + 100, cy: height / 2 + 50, r: 70 },   // Lingkaran keempat
    ]);

    useEffect(() => {
        let startTime = Date.now();

        const updatePositions = () => {
            const currentTime = Date.now() - startTime;

            setPositions((prevPositions) =>
                prevPositions.map((pos, index) => {
                    // Gerakan sinusoidal untuk X (geser kanan kiri)
                    const newCx = pos.cx + Math.sin(currentTime / 600 + index) * 2;

                    // Gerakan sinusoidal untuk Y (naik turun)
                    const newCy = pos.cy + Math.cos(currentTime / 800 + index) * 2;

                    return {
                        cx: newCx,  // Membiarkan posisi X tetap bergerak halus
                        cy: newCy,  // Membiarkan posisi Y tetap bergerak halus
                        r: pos.r,
                    };
                }),
            );
        };

        const interval = setInterval(updatePositions, 16); // Update setiap 16ms (sekitar 60fps)

        return () => clearInterval(interval);
    }, []);

    return (
        <Canvas style={{ flex: 1, width, height, position: "absolute" }}>
            {/* Efek blur untuk seluruh layar */}
            {positions.map((position, index) => (
                <Circle key={index} cx={position.cx} cy={position.cy} r={position.r}>
                    <LinearGradient
                        start={vec(0, 0)}
                        end={vec(256, 256)}
                        colors={["green", "cyan"]}
                    />
                </Circle>
            ))}
            {/*<BackdropFilter clip={rect}>*/}
            {/*    /!*<ColorMatrix matrix={SEPIA} />*!/*/}
            {/*</BackdropFilter>*/}
        </Canvas>
    );
};

export default BlobBackground;
