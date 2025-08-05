import { Widget } from "scripting";

(async () => {
    if (Widget.family === "accessoryRectangular") {
        const widgetView = await import("./widgets/accessaryRectangular");
        const view = await widgetView.WidgetView();
        Widget.present(view);
    } else if (Widget.family === "systemSmall") {
        const widgetView = await import("./widgets/systemSmall");
        const view = await widgetView.WidgetView();
        Widget.present(view);
    } else if (Widget.family === "systemMedium") {
        const widgetView = await import("./widgets/systemMedium");
        const view = await widgetView.WidgetView();
        Widget.present(view);
    } else if (Widget.family === "systemLarge") {
        const widgetView = await import("./widgets/systemLarge");
        await widgetView.Present();
    } else {
        throw new Error("未适配的 Widget 尺寸");
    }
})().catch(async (e) => {
    const { Text } = await import("scripting");
    Widget.present(<Text>{String(e)}</Text>);
});
