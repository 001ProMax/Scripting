import { gradient } from "scripting";
import { isDaytimeNow } from "./format";

export function getBackgroundColor(currentWeather: string) {
    // console.log(currentWeather);
    if (isDaytimeNow()) {
        switch (currentWeather) {
            case "CLEAR_DAY":
                return gradient("linear", {
                    colors: ["#114980", "#7398BE"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
            case "CLEAR": // 大部晴朗
                return gradient("linear", {
                    colors: ["#074580", "#4B88C2"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
            case "PARTLY_CLOUDY_DAY": //
                return gradient("linear", {
                    colors: ["#78A7C5", "#A1B8BD"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
            case "PARTLY": // 大部多云（彩云天气无）
                return gradient("linear", {
                    colors: ["#022D6C", "#5684B7"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
            case "PARTLY": // 局部多云
                return gradient("linear", {
                    colors: ["#026A95", "#77AECE"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
            // 雾霾
            case "LIGHT_HAZE":
            case "MODERATE_HAZE":
            case "HEAVY_HAZE":
            // 雨
            case "LIGHT_RAIN":
            case "MODERATE_RAIN":
            case "HEAVY_RAIN": // 默认雨
                return gradient("linear", {
                    colors: ["#5E6B7E", "#495666"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
            case "STORM_RAIN": // 暴雨
                return gradient("linear", {
                    colors: ["#4B5C6B", "#27323F"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
            case "FOG":
            case "LIGHT_SNOW":
            case "MODERATE_SNOW":
            case "HEAVY_SNOW":
            case "STORM_SNOW":
            case "DUST":
            case "SAND":
            case "WIND":
            default:
                return gradient("linear", {
                    colors: ["#5D6778", "#4D5A69"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
        }
    } else {
        switch (currentWeather) {
            case "CLEAR_NIGHT":
                return gradient("linear", {
                    colors: ["#04051A", "#2B3A56"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
            case "PARTLY_CLOUDY_NIGHT":
                return gradient("linear", {
                    colors: ["#263040", "#282F3E"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
            // 雾霾
            case "LIGHT_HAZE":
            case "MODERATE_HAZE":
            case "HEAVY_HAZE":
            // 雨
            case "LIGHT_RAIN":
            case "MODERATE_RAIN":
            case "HEAVY_RAIN": // 默认雨
                return gradient("linear", {
                    colors: ["#5E6B7E", "#495666"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
            case "STORM_RAIN": // 暴雨
                return gradient("linear", {
                    colors: ["#141F2C", "#1E2A3A"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
            case "FOG":
            case "LIGHT_SNOW":
            case "MODERATE_SNOW":
            case "HEAVY_SNOW":
            case "STORM_SNOW":
            case "DUST":
            case "SAND":
            case "WIND":
            default:
                return gradient("linear", {
                    colors: ["#141F2C", "#1E2A3A"],
                    startPoint: "top",
                    endPoint: "bottom",
                });
        }
    }
}

export const shadowStyle = {
    color: "rgba(0,0,0,0.3)" as Color,
    radius: 4,
    x: 0,
    y: 2,
};

export const RainingViewColor_Small = gradient("linear", {
    colors: ["#0C84FE", "#C7F0FC"],
    startPoint: "top",
    endPoint: "bottom",
});

export const RainingViewColor_Large = gradient("linear", {
    colors: ["#C9F2FD", "#8ADCFE"],
    startPoint: "top",
    endPoint: "bottom",
});

export const DailyColor = gradient("linear", {
    colors: ["#FC9F19", "#FF6729"],
    startPoint: "leading",
    endPoint: "trailing",
});

export const DeviderColor = "rgba(255,255,255,0.6)";
export const RainingViewAxisColor_Small = "rgba(255,255,255,0.6)";
