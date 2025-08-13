import { Script, Navigation } from "scripting";
import { SettingView } from "./pages/setting";

(async () => {
    await Navigation.present({
        element: <SettingView />,
    });
})()
    .catch((e) => {
        console.log(e.message);
    })
    .finally(() => {
        Script.exit();
    });
