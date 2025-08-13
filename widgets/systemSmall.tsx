import { HStack, VStack, Spacer, Widget } from "scripting";
import { getBackgroundColor } from "../utils/color";
import {
    WeatherIcon,
    weatherMap,
    RainingView_Small,
    RainingView_Description_Small,
    AlertView_Small,
    TitleLocationView,
    TitleDailyTemperatureView,
    TitleCurrentTemperatureView,
} from "../utils/component";
import { getAlartContent } from "../utils/format";

export function View(result: any) {
    const unit = "°";

    const isAlert = result?.alert?.content?.length > 0;
    const currentWeather: keyof typeof weatherMap = result?.realtime?.skycon;
    const precipitation = result?.minutely?.precipitation;
    const isPrecipitation = precipitation?.some((value: number) => value !== 0) ?? false;

    // --- Style --- //
    const adcodes = result.alert.adcodes;
    const location = adcodes[adcodes.length - 1];
    const currentTemperature = result?.realtime?.temperature.toFixed(0) + unit;

    return (
        <VStack padding alignment={"leading"} widgetBackground={getBackgroundColor(currentWeather)}>
            {/* Title */}
            <HStack alignment={"top"} padding={{ top: -2 }}>
                <TitleLocationView location={location.name} isCurrentLocation={true} />
                <Spacer />
                {isPrecipitation ? (
                    <WeatherIcon font={17} weatherIcon={weatherMap[currentWeather].icon} />
                ) : null}
            </HStack>
            {isPrecipitation ? null : (
                <TitleCurrentTemperatureView temperature={currentTemperature} padding={{ top: -12 }} />
            )}

            {/* <Spacer /> */}
            {/* Bottom */}
            <VStack alignment={"leading"}>
                {isPrecipitation ? (
                    <>
                        <RainingView_Description_Small
                            content={"未来一小时" + weatherMap[currentWeather].text}
                            padding={{ top: -8, bottom: -4 }}
                        />
                        <Spacer />
                        <RainingView_Small heightRate={0.44} data={precipitation} />
                    </>
                ) : (
                    <>
                        <Spacer />
                        <WeatherIcon
                            font={14}
                            frame={{ height: 14 }}
                            padding={{ top: -8 }}
                            weatherIcon={weatherMap[currentWeather].icon}
                        />
                        {(() => {
                            if (isAlert) {
                                const content = getAlartContent(result.alert.content);

                                if (content) {
                                    return <AlertView_Small content={content} />;
                                } else {
                                    return (
                                        <TitleDailyTemperatureView
                                            padding={{ bottom: -10 }}
                                            alignment={"leading"}
                                        />
                                    );
                                }
                            } else {
                                const maxTemperature = result?.daily?.temperature[0]?.max.toFixed(0) + unit;
                                const minTemperature = result?.daily?.temperature[0]?.min.toFixed(0) + unit;
                                return (
                                    <TitleDailyTemperatureView
                                        padding={{ bottom: -8 }}
                                        alignment={"leading"}
                                        weatherName={weatherMap[currentWeather].text}
                                        maxTemperature={maxTemperature}
                                        minTemperature={minTemperature}
                                    />
                                );
                            }
                        })()}
                    </>
                )}
            </VStack>
        </VStack>
    );
}
