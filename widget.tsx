import { Widget, Text } from "scripting";
import { fetchColorfulClouds, getLocation } from "./utils/colorfulclouds";
import { handleNotifications } from "./utils/notification";
import { profile } from "./pages/setting";

import { View as accessoryRectangularView } from "./widgets/accessoryRectangular";
import { View as accessoryCircularView } from "./widgets/accessoryCircular";
import { View as accessoryInlineView } from "./widgets/accessoryInline";
import { View as systemSmallView } from "./widgets/systemSmall";
import { View as systemMediumView } from "./widgets/systemMedium";
import { View as systemLargeView } from "./widgets/systemLarge";

(async () => {
    const { latitude, longitude, isCurrentLocation = true } = await getLocation();
    const { result } = await fetchColorfulClouds(latitude, longitude);

    const { Precipitation } = profile.notification;
    if (Precipitation) await handleNotifications(result, isCurrentLocation);
    presentWidgetView(result);
})().catch(async (e) => {
    console.log(e.message);
    Widget.present(<Text>{String(e)}</Text>);
});

function presentWidgetView(result: any) {
    let CurrentView: (result: any) => any;

    switch (Widget.family) {
        // 锁屏
        case "accessoryRectangular":
            CurrentView = accessoryRectangularView;
            break;
        case "accessoryCircular":
            CurrentView = accessoryCircularView;
            break;
        case "accessoryInline":
            CurrentView = accessoryInlineView;
            break;
        // 桌面
        case "systemSmall":
            CurrentView = systemSmallView;
            break;
        case "systemMedium":
            CurrentView = systemMediumView;
            break;
        case "systemLarge":
            CurrentView = systemLargeView;
            break;
        default:
            throw new Error("未适配的 Widget 尺寸");
    }

    const { RefreshInterval } = profile.widget;

    Widget.present(
        CurrentView(result),
        RefreshInterval === 0
            ? undefined
            : {
                  policy: "after",
                  date: new Date(Date.now() + 1000 * 60 * RefreshInterval),
              }
    );
}
