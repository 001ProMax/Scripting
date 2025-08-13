import {
    Text,
    Image,
    HStack,
    Widget,
    VStack,
    ZStack,
    Spacer,
    Rectangle,
    Divider,
    UnevenRoundedRectangle,
} from "scripting";
import {
    shadowStyle,
    RainingViewColor_Small,
    RainingViewColor_Large,
    DeviderColor,
    RainingViewAxisColor_Small,
} from "./color";
import { compressTo20 } from "./format";

const { width, height } = Widget.displaySize;

const unit = "°";

export const weatherMap = {
    CLEAR_DAY: { text: "晴天", icon: "sun.max.fill" },
    CLEAR_NIGHT: { text: "晴天", icon: "moon.stars.fill" },
    PARTLY_CLOUDY_DAY: { text: "多云", icon: "cloud.fill" },
    PARTLY_CLOUDY_NIGHT: { text: "多云", icon: "cloud.moon.fill" },
    CLOUDY: { text: "阴天", icon: "cloud.fill" },
    LIGHT_HAZE: { text: "轻度雾霾", icon: "sun.haze.fill" },
    MODERATE_HAZE: { text: "中度雾霾", icon: "sun.haze.fill" },
    HEAVY_HAZE: { text: "重度雾霾", icon: "sun.haze.fill" },
    LIGHT_RAIN: { text: "小雨", icon: "cloud.drizzle.fill" },
    MODERATE_RAIN: { text: "中雨", icon: "cloud.rain.fill" },
    HEAVY_RAIN: { text: "大雨", icon: "cloud.heavyrain.fill" },
    STORM_RAIN: { text: "暴雨", icon: "cloud.bolt.rain.fill" },
    FOG: { text: "雾", icon: "cloud.fog.fill" },
    LIGHT_SNOW: { text: "小雪", icon: "snowflake" },
    MODERATE_SNOW: { text: "中雪", icon: "cloud.snow.fill" },
    HEAVY_SNOW: { text: "大雪", icon: "cloud.snow.fill" },
    STORM_SNOW: { text: "暴雪", icon: "wind.snow" },
    DUST: { text: "浮尘", icon: "sun.dust.fill" },
    SAND: { text: "沙尘", icon: "sun.dust.fill" },
    WIND: { text: "大风", icon: "wind" },
    ALERT: { text: "恶劣天气", icon: "exclamationmark.triangle.fill" },
};

export function TitleView_Small({
    weatherIcon,
    location,
    isCurrentLocation,
    temperature,
    weatherName,
    maxTemperature,
    minTemperature,
    content,
}: {
    weatherIcon: string;
    location: string;
    isCurrentLocation: boolean;
    temperature: string;
    weatherName?: string;
    maxTemperature?: string;
    minTemperature?: string;
    content?: string;
}) {
    return (
        <VStack alignment={"leading"}>
            {/* Top */}
            <HStack alignment={"top"}>
                <TitleLocationView location={location} isCurrentLocation={isCurrentLocation} />
                <Spacer />
                <WeatherIcon font={17} weatherIcon={weatherIcon} />
            </HStack>
            <HStack alignment={"bottom"}>
                <TitleCurrentTemperatureView temperature={temperature} />
                <Spacer />
                {content ? (
                    <AlertView_Small content={content} />
                ) : (
                    <TitleDailyTemperatureView
                        alignment={"leading"}
                        weatherName={weatherName}
                        maxTemperature={maxTemperature}
                        minTemperature={minTemperature}
                    />
                )}
            </HStack>
        </VStack>
    );
}

export function TitleView_Large({
    weatherIcon,
    weatherName,
    maxTemperature,
    minTemperature,
    content,
    location,
    isCurrentLocation,
    temperature = "",
}: {
    weatherIcon: string;
    weatherName?: string;
    maxTemperature?: string;
    minTemperature?: string;
    content?: string;
    location: string;
    isCurrentLocation: boolean;
    temperature?: string;
}) {
    return (
        <>
            {/* Top */}
            <HStack alignment={"top"}>
                <TitleLocationView location={location} isCurrentLocation={isCurrentLocation} />
                <Spacer />
                <WeatherIcon font={17} weatherIcon={weatherIcon} />
            </HStack>
            {/* <Spacer /> */}
            <HStack alignment={"bottom"}>
                <TitleCurrentTemperatureView temperature={temperature} />
                <Spacer />
                {content ? (
                    <AlertView_Large content={content} />
                ) : (
                    <TitleDailyTemperatureView
                        alignment={"trailing"}
                        weatherName={weatherName}
                        maxTemperature={maxTemperature}
                        minTemperature={minTemperature}
                    />
                )}
            </HStack>
        </>
    );
}

export function TitleLocationView({
    location,
    isCurrentLocation,
}: {
    location: string;
    isCurrentLocation: boolean;
}) {
    return (
        <HStack>
            <Text foregroundStyle="white" font={17} bold={true} shadow={shadowStyle}>
                {location}
            </Text>
            {isCurrentLocation ? (
                <Image
                    padding={{ leading: -6 }}
                    systemName={"location.fill"}
                    font={12}
                    // Color
                    symbolRenderingMode="palette"
                    foregroundStyle={{
                        primary: "white",
                        secondary: "white",
                        tertiary: "white",
                    }}
                />
            ) : null}
        </HStack>
    );
}

export function TitleCurrentTemperatureView({ temperature }: { temperature: string }) {
    return (
        <Text foregroundStyle="white" font={44} shadow={shadowStyle} fontWeight={"light"}>
            {temperature || ""}
        </Text>
    );
}

export function AlertView_Small({ content }: { content: string }) {
    return (
        <Text
            foregroundStyle="white"
            bold={true}
            font={14}
            shadow={shadowStyle}
            lineLimit={2}
            multilineTextAlignment={"leading"}>
            {content}
        </Text>
    );
}

export function AlertView_Large({ content }: { content: string }) {
    return (
        <VStack frame={{ height: 42 }} padding={{ bottom: 10 }}>
            <Spacer />
            <Text
                // padding={{ bottom: 9 }}
                foregroundStyle="white"
                bold={true}
                font={14}
                shadow={shadowStyle}
                lineLimit={2}
                multilineTextAlignment={"trailing"}>
                {content}
            </Text>
        </VStack>
    );
}

export function TitleDailyTemperatureView({
    alignment,
    weatherName,
    maxTemperature,
    minTemperature,
}: {
    alignment: "leading" | "trailing";
    weatherName?: string;
    maxTemperature?: string;
    minTemperature?: string;
}) {
    return (
        <VStack alignment={alignment} padding={{ bottom: 5 }}>
            <Text foregroundStyle="white" fontWeight={"medium"} font={15} shadow={shadowStyle}>
                {weatherName || ""}
            </Text>
            <HStack padding={{ top: -12 }}>
                <VStack spacing={-2}>
                    <Text foregroundStyle="white" font={10} shadow={shadowStyle}>
                        {"最"}
                    </Text>
                    <Text foregroundStyle="white" font={10} shadow={shadowStyle}>
                        {"高"}
                    </Text>
                </VStack>
                <Text
                    foregroundStyle="white"
                    font={24}
                    fontWeight="light"
                    padding={{ leading: -6 }}
                    shadow={shadowStyle}>
                    {maxTemperature || ""}
                </Text>
                <VStack spacing={-2}>
                    <Text foregroundStyle="white" font={10} shadow={shadowStyle}>
                        {"最"}
                    </Text>
                    <Text foregroundStyle="white" font={10} shadow={shadowStyle}>
                        {"低"}
                    </Text>
                </VStack>
                <Text
                    foregroundStyle="white"
                    font={24}
                    fontWeight="light"
                    padding={{ leading: -6 }}
                    shadow={shadowStyle}>
                    {minTemperature || ""}
                </Text>
            </HStack>
        </VStack>
    );
}

export function HourlyView({ hourly }: { hourly: any }) {
    return (
        <HStack>
            {(() => {
                return Array.from({ length: 6 }, (_, i) => i).map((index) => {
                    const temp = hourly.temperature[index].value.toFixed(0) + unit;
                    const skycon = hourly.skycon[index];
                    const date = new Date(skycon.datetime);
                    const hour = date.getHours();

                    return (
                        <>
                            <VStack>
                                {/* <Spacer /> */}
                                <Text
                                    foregroundStyle="white"
                                    monospacedDigit
                                    font={13}
                                    bold={true}
                                    opacity={0.64}>
                                    {hour + "时"}
                                </Text>
                                {/* <Spacer /> */}
                                <WeatherIcon
                                    weatherIcon={weatherMap[skycon.value as keyof typeof weatherMap].icon}
                                    frame={{ height: 18 }}
                                    offset={{ x: 0, y: -1 }}
                                />

                                {/* <Image
                                    systemName={weatherMap[skycon.value as keyof typeof weatherMap].icon}
                                    symbolRenderingMode="multicolor"
                                /> */}
                                {/* <Spacer /> */}
                                <Text
                                    foregroundStyle="white"
                                    monospacedDigit
                                    bold={true}
                                    font={14}
                                    offset={{ x: 0, y: 2 }}
                                    shadow={shadowStyle}>
                                    {temp}
                                </Text>
                                {/* <Spacer /> */}
                            </VStack>
                            {index < 5 ? <Spacer /> : null}
                        </>
                    );
                });
            })()}
        </HStack>
    );
}

export function RainingView_Rectangle({ data }: { data: number[] }) {
    const barHeight = 20;
    const barSpacing = 3;
    const barRadius = 2;

    return (
        <HStack spacing={barSpacing} alignment={"bottom"}>
            {compressTo20(data).map((length: number) => {
                const height = length === 0 ? 0 : length < 0.01 ? 1 : barHeight * length;
                return (
                    <VStack frame={{ height: barHeight + 8 }}>
                        <Spacer />
                        <UnevenRoundedRectangle
                            topLeadingRadius={barRadius}
                            topTrailingRadius={barRadius}
                            bottomLeadingRadius={0}
                            bottomTrailingRadius={0}
                            frame={{
                                height: height,
                            }}
                            fill={{
                                color: "lightGray",
                                gradient: true,
                            }}
                        />
                    </VStack>
                );
            })}
        </HStack>
    );
}

export function RainingView_Small({ data, heightRate }: { data: number[]; heightRate: number }) {
    const barHeight = height * heightRate;
    const barSpacing = 3;
    return (
        <VStack alignment={"leading"}>
            <ZStack alignment={"top"}>
                <Divider overlay={<Rectangle fill={"gray"} />} />
                <Divider overlay={<Rectangle fill={"gray"} offset={{ x: 0, y: barHeight / 3 }} />} />
                <Divider overlay={<Rectangle fill={"gray"} offset={{ x: 0, y: (barHeight * 2) / 3 }} />} />
                <HStack spacing={barSpacing} alignment={"bottom"} frame={{ height: barHeight }}>
                    {compressTo20(data).map((length: number) => {
                        return (
                            <Rectangle
                                fill={"clear"}
                                overlay={{
                                    alignment: "bottom",
                                    content: (
                                        <Rectangle
                                            fill={RainingViewColor_Small}
                                            mask={{
                                                alignment: "bottom",
                                                content: (
                                                    <UnevenRoundedRectangle
                                                        topLeadingRadius={10}
                                                        topTrailingRadius={10}
                                                        bottomLeadingRadius={0}
                                                        bottomTrailingRadius={0}
                                                        frame={{
                                                            height: barHeight * length,
                                                        }}
                                                    />
                                                ),
                                            }}
                                        />
                                    ),
                                }}
                            />
                        );
                    })}
                </HStack>
            </ZStack>
            <Divider overlay={<Rectangle fill={DeviderColor} />} padding={{ top: -8 }} />
            <RainingViewX_Small padding={{ top: -15 }} />
        </VStack>
    );
}

export function RainingView_Middle({
    data,
    heightRate,
    leaving,
}: {
    data: number[];
    heightRate: number;
    leaving: number;
}) {
    const barHeight = height * heightRate - leaving;
    const barSpacing = 2.5;
    return (
        <VStack alignment={"leading"}>
            <Spacer />
            <RainingView_Title padding={{ top: 2, bottom: -6 }} />
            <ZStack alignment={"top"}>
                <Divider overlay={<Rectangle fill={"gray"} />} />
                <Divider overlay={<Rectangle fill={"gray"} />} offset={{ x: 0, y: barHeight / 3 }} />
                <Divider overlay={<Rectangle fill={"gray"} />} offset={{ x: 0, y: (barHeight * 2) / 3 }} />
                <HStack alignment={"bottom"} spacing={barSpacing} frame={{ height: barHeight }}>
                    {data.map((length: number) => {
                        return (
                            <Rectangle
                                fill={"clear"}
                                overlay={{
                                    alignment: "bottom",
                                    content: (
                                        <Rectangle
                                            fill={RainingViewColor_Large}
                                            mask={{
                                                alignment: "bottom",
                                                content: (
                                                    <UnevenRoundedRectangle
                                                        topLeadingRadius={5}
                                                        topTrailingRadius={5}
                                                        bottomLeadingRadius={0}
                                                        bottomTrailingRadius={0}
                                                        frame={{
                                                            height: barHeight * length,
                                                        }}
                                                    />
                                                ),
                                            }}
                                        />
                                    ),
                                }}
                            />
                        );
                    })}
                </HStack>
            </ZStack>
            <Divider overlay={<Rectangle fill={DeviderColor} />} padding={{ top: -8 }} />
            <RainingViewX_Large padding={{ top: -12 }} />
        </VStack>
    );
}

// export function RainingView_Large({ data }: { data: number[] }) {
//     const barHeight = 96;
//     return (
//         <VStack alignment={"leading"}>
//             <RainingView_Middle data={data} barHeight={barHeight} />
//             <RainingView_Description_Large content="未来一小时持续暴雨" />
//         </VStack>
//     );
// }

export function WeatherIcon({ weatherIcon }: { weatherIcon: string }) {
    if (weatherIcon === "WIND") {
        return <Image systemName={weatherIcon} foregroundStyle={"white"} shadow={shadowStyle} />;
    }
    return <Image systemName={weatherIcon} symbolRenderingMode="multicolor" shadow={shadowStyle} />;
}

function RainingView_Title() {
    return (
        <Text font={12} bold foregroundStyle={"white"} opacity={0.6}>
            未来一小时降水强度
        </Text>
    );
}

export function RainingView_Description_Small({ content }: { content: string }) {
    return (
        <Text font={15} foregroundStyle={"white"} fontWeight={"medium"}>
            {content}
        </Text>
    );
}

export function RainingView_Description_Large({ content }: { content: string }) {
    return (
        <Text font={16} foregroundStyle={"white"} lineLimit={1}>
            {content}
        </Text>
    );
}

function RainingViewX_Large() {
    return (
        <HStack font={16} fontWeight={"medium"} foregroundStyle={"white"} opacity={0.5}>
            <Text>现在</Text>
            <Text offset={{ x: 10, y: 0 }}>10分钟</Text>
            <Text offset={{ x: 50, y: 0 }}>30分钟</Text>
        </HStack>
    );
}

export function RainingViewX_Small() {
    return (
        <HStack>
            <Text font={13} foregroundStyle={RainingViewAxisColor_Small} fontWeight="medium">
                {"现在"}
            </Text>
            <Spacer />
            <Text font={13} foregroundStyle={RainingViewAxisColor_Small} fontWeight="medium">
                {"60分钟"}
            </Text>
        </HStack>
    );
}

export function WeatherIcon_HourlyView({ weatherIcon }: { weatherIcon: string }) {
    return <Image font={17} systemName={weatherIcon} symbolRenderingMode="multicolor" shadow={shadowStyle} />;
}
