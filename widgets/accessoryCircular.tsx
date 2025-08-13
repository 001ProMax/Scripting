import { Text, Image, VStack, Spacer, Widget } from "scripting";
// import { weatherMap } from "../utils/component";

export function View(result: any) {
    // const currentWeather: keyof typeof weatherMap = result?.realtime?.skycon;
    // const icon = weatherMap[currentWeather].icon;
    const precipitation = result.hourly.precipitation;
    const firstRainDay = (() => {
        const item = precipitation.find((p: any) => p.probability > 0);
        if (!item) return null;
        const weekNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return weekNames[new Date(item.datetime).getDay()];
    })();

    if (firstRainDay) {
        const icon = "cloud.rain.fill";

        return (
            <VStack
                frame={Widget.displaySize}
                widgetBackground={{
                    style: "regularMaterial",
                    shape: "circle",
                }}>
                <Image systemName={icon} />
                <Text font={13} fontWeight="medium" padding={{ top: -2 }}>
                    {firstRainDay}
                </Text>
            </VStack>
        );
    } else {
        const icon = "umbrella.fill";

        return (
            <VStack frame={Widget.displaySize}>
                <Image systemName={icon} />
                <Text font={13} fontWeight="medium" padding={{ top: -2 }}>
                    {"0%"}
                </Text>
            </VStack>
        );
    }
}
