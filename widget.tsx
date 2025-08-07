import { Widget } from "scripting";
import { fetchColorfulClouds, getLocation } from "./utils/colorfulclouds";
import { AlertNotification, RainNotification } from "./utils/notification";

(async () => {
    const getLocationPromise = getLocation();

    let path = "";
    if (Widget.family === "accessoryRectangular") {
        path = "./widgets/accessoryRectangular";
    } else if (Widget.family === "systemSmall") {
        path = "./widgets/systemSmall";
    } else if (Widget.family === "systemMedium") {
        path = "./widgets/systemMedium";
    } else if (Widget.family === "systemLarge") {
        path = "./widgets/systemLarge";
    } else {
        throw new Error("未适配的 Widget 尺寸");
    }

    const { latitude, longitude } = await getLocationPromise;
    const { result } = await fetchColorfulClouds(latitude, longitude);

    const rainContent = result.minutely.description;
    await RainNotification(rainContent);

    const alertContent = (result.alert?.content).map((item: any) => item?.title).join("\n");
    if (alertContent) {
        await AlertNotification(alertContent);
    }

    const { View } = await import(path);
    Widget.present(View(result));
})().catch(async (e) => {
    const { Text } = await import("scripting");
    Widget.present(<Text>{String(e)}</Text>);
});
