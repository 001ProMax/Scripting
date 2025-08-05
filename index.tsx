import { Script } from "scripting";

(async () => {
    let location = await Location.pickFromMap();

    if (location) {
        Clipboard.copyText(JSON.stringify(location));
    } else {
        const key = "Location";
        location = await Location.requestCurrent();
        Storage.set(key, location);
    }

    Script.exit();
})().catch((e) => {
    console.log(e.message);
});
