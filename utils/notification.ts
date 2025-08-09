import { Notification, VStack, Text, Script, Spacer } from "scripting";

const key = "CurrentWeather";
const name = Script.name;

export async function RainNotification(content: string) {
    await Notification.schedule({
        title: name,
        body: content,
        threadIdentifier: name,
        avoidRunningCurrentScriptWhenTapped: true,
        // customUI: true,
    });
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
            // customUI: true,
        });

        weatherJson.alertContent = content;
        Storage.set(key, weatherJson);
    }
}
