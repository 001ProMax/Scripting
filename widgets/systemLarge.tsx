import { Widget, Divider, Text, Image, HStack, VStack, Spacer, Capsule, Rectangle } from "scripting";
import { shadowStyle, getBackgroundColor, DeviderColor, DailyColor } from "../utils/color";
import {
    TitleView_Large,
    HourlyView,
    weatherMap,
    WeatherIcon,
    RainingView_Middle,
    RainingView_Description_Large,
} from "../utils/component";

export function View(result: any) {
    const unit = "°";

    const isAlert = result?.alert?.content?.length > 0;
    const currentWeather: keyof typeof weatherMap = result?.realtime?.skycon;
    const precipitation = result?.minutely?.precipitation;
    const isPrecipitation = precipitation?.some((value: number) => value !== 0) ?? false;

    // --- Style --- //
    const background = getBackgroundColor(currentWeather);

    const currentTemperature = result?.realtime?.temperature.toFixed(0) + unit;
    const maxTemperature = result?.daily?.temperature[0]?.max.toFixed(0) + unit;
    const minTemperature = result?.daily?.temperature[0]?.min.toFixed(0) + unit;

    const adcodes = result.alert.adcodes;
    const location = adcodes[adcodes.length - 1];

    return (
        <VStack padding widgetBackground={background} alignment={"leading"}>
            {/* Title */}
            <TitleView_Large
                weatherIcon={weatherMap[currentWeather].icon}
                weatherName={weatherMap[currentWeather].text}
                maxTemperature={maxTemperature}
                minTemperature={minTemperature}
                location={location.name}
                isCurrentLocation={true}
                temperature={currentTemperature}
            />
            <Spacer />
            {/* Raining View */}
            {isPrecipitation ? (
                <>
                    <RainingView_Middle
                        data={precipitation}
                        heightRate={0.75}
                        leaving={178}
                        padding={{ top: -12 }}
                    />
                    <Spacer />
                    <RainingView_Description_Large content={result.minutely.description} />
                </>
            ) : null}
            <Divider overlay={<Rectangle fill={DeviderColor} />} />
            <Spacer />
            {/* Alert View */}
            {(() => {
                if (!isPrecipitation && isAlert) {
                    const contentList = result.alert.content;
                    return (
                        <HStack frame={{ height: 14 }}>
                            <Image
                                systemName={weatherMap["ALERT"].icon}
                                font={13}
                                shadow={shadowStyle}
                                symbolRenderingMode="palette"
                                foregroundStyle={{
                                    primary: "rgba(0, 0, 0, 0.5)",
                                    secondary: "black",
                                    tertiary: "white",
                                }}
                            />
                            <Text foregroundStyle="white" font={14} shadow={shadowStyle} lineLimit={1}>
                                {(() => {
                                    if (contentList.length === 1) {
                                        return contentList[0].title;
                                    } else {
                                        return contentList[0].title + "等" + (contentList.length - 1) + "项";
                                    }
                                })()}
                            </Text>
                            <Spacer />
                        </HStack>
                    );
                } else {
                    return null;
                }
            })()}
            {!isPrecipitation && isAlert ? <Spacer /> : null}
            {!isPrecipitation && isAlert ? <Divider overlay={<Rectangle fill={DeviderColor} />} /> : null}
            {!isPrecipitation && isAlert ? <Spacer /> : null}
            {/* Hourly View */}
            <HourlyView hourly={result.hourly} />
            <Spacer />
            {isPrecipitation ? null : <Divider overlay={<Rectangle fill={DeviderColor} />} />}
            {isPrecipitation ? null : <Spacer />}
            {/* Daily View */}
            {isPrecipitation ? null : (
                <VStack padding={{ top: 6, bottom: 6 }}>
                    {(() => {
                        const dataLength = isAlert ? 4 : 5;
                        const daily = result.daily;
                        const skyconList = daily.skycon.slice(0, dataLength);
                        const tempList = daily.temperature.slice(0, dataLength);

                        const globalMin = Math.min(...tempList.map((t: { min: number }) => t.min));
                        const globalMax = Math.max(...tempList.map((t: { max: number }) => t.max));
                        const length = globalMax - globalMin;

                        return Array.from({ length: dataLength }, (_, i) => i).map((index) => {
                            const { date, value } = skyconList[index];
                            const weatherValue = value as keyof typeof weatherMap;
                            const temp = tempList[index];
                            const dateTime = new Date(date);
                            const weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
                                dateTime.getDay()
                            ];

                            const min = temp.min;
                            const max = temp.max;

                            const minTemp = min.toFixed(0) + unit;
                            const maxTemp = max.toFixed(0) + unit;

                            const DailyBarWidth = Widget.displaySize.width / 2 - 40;

                            let offsetX = DailyBarWidth * ((min - globalMin) / length);
                            let barWidth = DailyBarWidth * ((max - min) / length);

                            if (offsetX + barWidth > DailyBarWidth) {
                                barWidth = DailyBarWidth - offsetX;
                            }

                            const fontSize = 15;
                            const iconSize = 21;
                            const barHeight = 4;
                            return (
                                <HStack key={index}>
                                    <Text
                                        foregroundStyle="white"
                                        bold={true}
                                        font={fontSize}
                                        shadow={shadowStyle}
                                        frame={{ width: fontSize + fontSize }}>
                                        {weekDay}
                                    </Text>
                                    <Spacer />

                                    <WeatherIcon
                                        font={17}
                                        weatherIcon={weatherMap[weatherValue].icon}
                                        frame={{ height: iconSize, width: iconSize }}
                                    />

                                    <Spacer />

                                    {/* Progress View */}
                                    <Text
                                        foregroundStyle="white"
                                        monospacedDigit
                                        bold={true}
                                        font={fontSize}
                                        opacity={0.6}>
                                        {minTemp}
                                    </Text>
                                    <Capsule
                                        frame={{ width: DailyBarWidth, height: barHeight }}
                                        fill={"rgba(0,0,0,0.2)"}
                                        opacity={0.5}
                                        overlay={{
                                            alignment: "leading",
                                            content: (
                                                <Rectangle
                                                    frame={{ width: DailyBarWidth, height: barHeight }}
                                                    fill={DailyColor}
                                                    mask={{
                                                        alignment: "leading",
                                                        content: (
                                                            <Capsule
                                                                offset={{ x: offsetX, y: 0 }}
                                                                frame={{ width: barWidth, height: 4 }}
                                                            />
                                                        ),
                                                    }}
                                                />
                                            ),
                                        }}
                                    />
                                    <Text
                                        foregroundStyle="white"
                                        monospacedDigit
                                        bold={true}
                                        font={fontSize}
                                        shadow={shadowStyle}>
                                        {maxTemp}
                                    </Text>
                                </HStack>
                            );
                        });
                    })()}
                </VStack>
            )}
        </VStack>
    );
}
