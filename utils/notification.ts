import { Notification, Script } from "scripting";

const key = "CurrentWeather";
const name = Script.name;

export async function RainNotification(content: string) {
    const weatherJson: any = Storage.get(key) || {};
    const { rainContent } = weatherJson;

    if (rainContent !== content) {
        await Notification.schedule({
            title: name,
            body: content,
            threadIdentifier: name,
            avoidRunningCurrentScriptWhenTapped: true,
        });

        weatherJson.rainContent = content;
        Storage.set(key, weatherJson);
    }
}

export async function AlertNotification(content: string) {
    const weatherJson: any = Storage.get(key) || {};
    const { alertContent } = weatherJson;

    if (alertContent !== content) {
        await Notification.schedule({
            title: name,
            body: content,
            threadIdentifier: name,
            avoidRunningCurrentScriptWhenTapped: true,
        });

        weatherJson.alertContent = content;
        Storage.set(key, weatherJson);
    }
}
