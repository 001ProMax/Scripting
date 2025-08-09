import { VStack, Spacer, Widget } from "scripting";
import { getBackgroundColor } from "../utils/color";
import { getAlartContent } from "../utils/format";
import { TitleView_Large, HourlyView, weatherMap, RainingView_Middle } from "../utils/component";

const { width, height } = Widget.displaySize;

export function View(result: any) {
    const unit = "°";

    const currentWeather: keyof typeof weatherMap = result?.realtime?.skycon;
    const precipitation = result?.minutely?.precipitation;
    const isPrecipitation = precipitation?.some((value: number) => value !== 0) ?? false;

    // --- Style --- //
    let background = getBackgroundColor(currentWeather);

    const currentTemperature = result?.realtime?.temperature.toFixed(0) + unit;
    const maxTemperature = result?.daily?.temperature[0]?.max.toFixed(0) + unit;
    const minTemperature = result?.daily?.temperature[0]?.min.toFixed(0) + unit;

    const adcodes = result.alert.adcodes;
    const location = adcodes[adcodes.length - 1];

    return (
        <VStack padding widgetBackground={background} alignment={"leading"}>
            <TitleView_Large
                frame={{ height: isPrecipitation ? 24 : 26 }}
                weatherIcon={weatherMap[currentWeather].icon}
                weatherName={weatherMap[currentWeather].text}
                maxTemperature={maxTemperature}
                minTemperature={minTemperature}
                location={location.name}
                isCurrentLocation={true}
                temperature={currentTemperature}
                content={
                    isPrecipitation ? result.minutely.description : getAlartContent(result.alert.content)
                }
            />
            <Spacer />
            {isPrecipitation ? (
                <>
                    <RainingView_Middle
                        data={precipitation}
                        heightRate={0.76}
                        leaving={92}
                        frame={{ height: height * 0.45 }}
                        padding={{ top: 2 }}
                    />
                </>
            ) : (
                <>
                    <HourlyView
                        hourly={result.hourly}
                        padding={{ top: 4 }}
                        frame={{ height: height * 0.45 }}
                    />
                </>
            )}
        </VStack>
    );
}
