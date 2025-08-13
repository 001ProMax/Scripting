import { Text, Image, HStack, Spacer } from "scripting";
import { weatherMap } from "../utils/component";

export function View(result: any) {
    const currentWeather: keyof typeof weatherMap = result?.realtime?.skycon;
    const icon = weatherMap[currentWeather].icon;

    // const icon = "cloud.rain.fill";
    // const content = result.daily.precipitation[1].max;

    const adcodes = result.alert.adcodes;
    const location = adcodes[adcodes.length - 1];

    // console.log(content);
    return (
        <HStack>
            <Image systemName={icon} />
            <Text font={17} fontWeight="medium" padding={{ leading: -6 }}>
                {location.name}
            </Text>
            {/* <Spacer /> */}
        </HStack>
    );
}
