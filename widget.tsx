import { Widget } from "scripting";
import { fetchColorfulClouds, getLocation } from "./utils/colorfulclouds";
import { AlertNotification, RainNotification } from "./utils/notification";
import { profile } from "./pages/setting";

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
    const { RefreshInterval } = profile.widget;

    if (RefreshInterval === 0) {
        Widget.present(View(result));
    } else {
        Widget.present(View(result), {
            policy: "after",
            date: new Date(Date.now() + 1000 * 60 * RefreshInterval),
        });
    }
})().catch(async (e) => {
    const { Text } = await import("scripting");
    Widget.present(<Text>{String(e)}</Text>);
});
