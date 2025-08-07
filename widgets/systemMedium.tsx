import { VStack, Spacer } from "scripting";
import { getBackgroundColor } from "../utils/color";
import { getAlartContent } from "../utils/format";
import { TitleView_Large, HourlyView, weatherMap, RainingView_Middle } from "../utils/component";

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
        <VStack padding background={background} alignment={"leading"}>
            {/* Title */}
            <TitleView_Large
                frame={{ height: 24 }}
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
            {/* Bottom */}
            {isPrecipitation ? (
                <>
                    <RainingView_Middle data={precipitation} frame={{ height: 70 }} />
                </>
            ) : (
                <>
                    <HourlyView hourly={result.hourly} frame={{ height: 70 }} />
                </>
            )}
        </VStack>
    );
}
