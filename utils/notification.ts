import { Notification, Script } from "scripting";
import { profile } from "../pages/setting";

const key = "CurrentWeather";
const name = Script.name;

export async function RainNotification(title: string, subtitle: string, content: string) {
    await Notification.schedule({
        title: title + "：" + subtitle,
        // subtitle: subtitle,
        body: content,
        threadIdentifier: name,
        avoidRunningCurrentScriptWhenTapped: true,
        // customUI: true,
    });
}

export async function AlertNotification(content: string, location: string) {
    await Notification.schedule({
        title: location + "：" + "极端天气",
        body: content,
        threadIdentifier: name,
        avoidRunningCurrentScriptWhenTapped: true,
        // customUI: true,
    });
}

export async function handleNotifications(result: any, isCurrentLocation: boolean) {
    if (!result) return;

    const {
        NotificationInterval = "0",
        isLocalNotify,
        isSurroundNotify,
        isUselessNotify,
        ExtremeWeather,
    } = profile.notification;

    const key = "CurrentWeather";
    const stored = (Storage.get(key) as any) || {};
    stored.rain = stored.rain || {};
    stored.alert = stored.alert || {};

    const adcodes = result.alert.adcodes;
    const location = isCurrentLocation ? "当前位置" : adcodes[adcodes.length - 1].name;

    const rainContent = result.minutely.description;
    const storedRainContent = stored.rain.content || "";
    const storedTime = stored.alert.time || 0;
    const now = Date.now();

    if (Number(NotificationInterval) === 0 || now - storedTime >= 1000 * 60 * Number(NotificationInterval)) {
        if (storedRainContent !== rainContent) {
            if (/\d/.test(rainContent)) {
                // 判断是否为当地通知
                const isLocal = rainContent.includes("后");
                if (isLocal) {
                    if (isLocalNotify) {
                        await RainNotification(location, "降水状况", rainContent);
                        stored.rain.time = now;
                    }
                } else {
                    if (isSurroundNotify) {
                        await RainNotification(location, "周边天气", rainContent);
                        stored.rain.time = now;
                    }
                }
            } else if (isUselessNotify) {
                await RainNotification(location, "天气提示", rainContent);
                stored.rain.time = now;
            }
        }

        const alertContent = result.alert?.content || [];
        const newTitles = alertContent.map((item: any) => item.title);
        const storedTitles = stored.alert.content || [];

        if (ExtremeWeather && isCurrentLocation) {
            const unseenTitles = newTitles.filter((title: string) => !storedTitles.includes(title));
            if (unseenTitles.length > 0) {
                stored.alert.time = now;
                const content = unseenTitles.join("\n");
                await AlertNotification(content, location);
            }
        }

        stored.rain.content = rainContent;
        stored.alert.content = newTitles;
        Storage.set(key, stored);
    }
}
