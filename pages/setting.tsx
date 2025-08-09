import {
    Text,
    Image,
    Picker,
    Section,
    List,
    Button,
    Toggle,
    Navigation,
    NavigationStack,
    useState,
} from "scripting";

const key = "ColorfulCloudsSetting";
export const profile = (Storage.get(key) as any) || {
    notification: {
        Precipitation: true,
        ExtremeWeather: true,
        LiveIsland: true,
    },
    widget: {
        RefreshInterval: 5,
    },
};

const { Precipitation, ExtremeWeather, LiveIsland } = profile?.notification;
const { RefreshInterval } = profile?.widget;

export function SettingView() {
    const dismiss = Navigation.useDismiss();

    const [isPrecipitationEnabled, setIsPrecipitationEnabled] = useState(Precipitation);
    const [isExtremeWeatherEnabled, setIsExtremeWeatherEnabled] = useState(ExtremeWeather);
    const [isLiveIslandEnabled, setIsLiveIslandEnabled] = useState(LiveIsland);

    const [selectedValue, setSelectedValue] = useState<number>(RefreshInterval);

    const timeGapList = [0, 5, 10, 15, 30];

    const getLocation = async () => {
        await setLocation();
    };

    return (
        <NavigationStack>
            <List
                navigationTitle="设置"
                toolbar={{
                    topBarTrailing: [
                        <Button
                            action={() => {
                                dismiss();
                            }}>
                            <Text>保存</Text>
                        </Button>,
                    ],
                }}>
                <Section title="通知">
                    {/* <Toggle
                        value={isLiveIslandEnabled}
                        onChanged={(val) => {
                            profile.notification.LiveIsland = val;
                            Storage.set(key, profile);
                            setIsLiveIslandEnabled(val);
                        }}>
                        <Text>灵动岛</Text>
                    </Toggle> */}

                    <Toggle
                        value={isPrecipitationEnabled}
                        onChanged={(val) => {
                            profile.notification.Precipitation = val;
                            Storage.set(key, profile);
                            setIsPrecipitationEnabled(val);
                        }}>
                        <Text>降水通知</Text>
                    </Toggle>

                    <Toggle
                        value={isExtremeWeatherEnabled}
                        onChanged={(val) => {
                            profile.notification.ExtremeWeather = val;
                            Storage.set(key, profile);
                            setIsExtremeWeatherEnabled(val);
                        }}>
                        <Text>极端天气通知</Text>
                    </Toggle>
                </Section>

                <Section title="小组件">
                    <Picker
                        title="刷新时间间隔"
                        pickerStyle="menu"
                        value={selectedValue}
                        onChanged={(val: number) => {
                            profile.widget.RefreshInterval = val;
                            Storage.set(key, profile);
                            setSelectedValue(val);
                        }}>
                        {timeGapList.map((item) => {
                            return item === 0 ? (
                                <Text tag={item}>自动</Text>
                            ) : (
                                <Text tag={item}>{item} 分钟</Text>
                            );
                        })}
                    </Picker>
                </Section>
                <Section title="获取位置">
                    <Button action={getLocation}>
                        <Text>获取经纬度</Text>
                    </Button>
                </Section>
            </List>
        </NavigationStack>
    );
}

async function setLocation() {
    let location = await Location.pickFromMap();

    if (location) {
        Clipboard.copyText(JSON.stringify(location));
    } else {
        const key = "Location";
        location = await Location.requestCurrent();
        Storage.set(key, location);
    }

    if (location) {
        await Dialog.alert({
            title: "已拷贝经纬度",
            message: `经度: ${location.longitude}\n纬度: ${location.latitude}`,
        });
    }
}
