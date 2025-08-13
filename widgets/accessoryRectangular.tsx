import { Divider, Text, Image, HStack, VStack, Spacer } from "scripting";
import { firstNonZeroIndex } from "../utils/format";
import { RainingView_Rectangle, weatherMap, RainingViewX_Small } from "../utils/component";

export function View(result: any) {
    const unit = "°";

    const currentWeather: keyof typeof weatherMap = result?.realtime?.skycon;
    const precipitation = result?.minutely?.precipitation;
    const isAlert = result?.alert?.content?.length > 0;
    const isPrecipitation = precipitation?.some((value: number) => value !== 0) ?? false;

    // Process Title View
    const icon = weatherMap[isAlert ? "ALERT" : currentWeather].icon;

    return (
        <VStack alignment={"leading"}>
            <Spacer />
            {(() => {
                if (isPrecipitation) {
                    const chartWidth = 150;
                    const titleText = (() => {
                        const isRain = currentWeather.includes("RAIN");
                        return isRain
                            ? isAlert
                                ? weatherMap["ALERT"].text + "及" + weatherMap[currentWeather].text
                                : "正在下雨"
                            : firstNonZeroIndex(precipitation) + "分钟后";
                    })();

                    // 172 x 76
                    return (
                        <>
                            <TitleView icon={icon} titleText={titleText} />
                            <RainingView_Rectangle
                                data={precipitation}
                                frame={{ width: chartWidth }}
                                padding={{ top: -16 }}
                            />
                            <Divider padding={{ top: -6 }} frame={{ width: chartWidth }} />
                            <RainingViewX_Small padding={{ top: -13 }} frame={{ width: chartWidth }} />
                        </>
                    );
                } else {
                    const temperature = result?.daily?.temperature?.[0];
                    const currentTemperature = result?.realtime?.temperature.toFixed(0) + unit;

                    const titleText = (() => {
                        const currentTemperature = result?.realtime?.temperature.toFixed(0) + unit;
                        return isAlert ? weatherMap["ALERT"].text : currentTemperature;
                    })();

                    const detailText = isAlert
                        ? currentTemperature + " " + weatherMap[currentWeather].text
                        : weatherMap[currentWeather].text;

                    return (
                        <>
                            <TitleView icon={icon} titleText={titleText} />
                            <Text font={17}>{detailText}</Text>
                            <Text font={17} foregroundStyle="gray" fontWeight="medium">
                                {"最高" +
                                    temperature?.max.toFixed(0) +
                                    unit +
                                    " " +
                                    "最低" +
                                    temperature?.min.toFixed(0) +
                                    unit}
                            </Text>
                        </>
                    );
                }
            })()}
            <Spacer />
        </VStack>
    );
}

function TitleView({ icon, titleText }: { icon: string; titleText: string }) {
    return (
        <HStack>
            <Image systemName={icon} />
            <Text font={17} fontWeight="medium" padding={{ leading: -6 }}>
                {titleText}
            </Text>
            <Spacer />
        </HStack>
    );
}
