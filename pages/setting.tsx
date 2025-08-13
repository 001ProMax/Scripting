import {
    Text,
    // Image,
    VStack,
    Picker,
    Section,
    DisclosureGroup,
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
        // LiveIsland: true,
        isLocalNotify: true,
        isSurroundNotify: false,
        isUselessNotify: false,
        NotificationInterval: 0,
    },
    widget: {
        RefreshInterval: 0,
    },
};

const {
    Precipitation,
    ExtremeWeather,
    isLocalNotify,
    isSurroundNotify,
    isUselessNotify,
    NotificationInterval = 0,
} = profile?.notification;
const { RefreshInterval = 0 } = profile?.widget;

export function SettingView() {
    const dismiss = Navigation.useDismiss();

    const [isPrecipitationEnabled, setIsPrecipitationEnabled] = useState(Precipitation);
    const [isExtremeWeatherEnabled, setIsExtremeWeatherEnabled] = useState(ExtremeWeather);
    const [isUselessNotificationEnabled, setIsUselessNotificationEnabled] = useState(isUselessNotify);
    const [isLocalNotifyEnabled, setIsLocalNotifyEnabled] = useState(isLocalNotify);
    const [isSurroundNotifyEnabled, setIsSurroundNotifyEnabled] = useState(isSurroundNotify);

    // const [isLiveIslandEnabled, setIsLiveIslandEnabled] = useState(LiveIsland);

    const [refreshInterval, setRefreshInterval] = useState<number>(RefreshInterval);
    const [notificationInterval, setNotificationInterval] = useState<number>(NotificationInterval);

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
                <Section
                    header={<Text>小组件</Text>}
                    footer={<Text attributedString="· 实际刷新频率由系统决定" />}>
                    <Picker
                        title="刷新时间间隔"
                        pickerStyle="menu"
                        value={refreshInterval}
                        onChanged={(val: number) => {
                            profile.widget.RefreshInterval = val;
                            Storage.set(key, profile);
                            setRefreshInterval(val);
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

                <Section
                    header={<Text>获取位置</Text>}
                    footer={<Text attributedString="· 获取后填入桌面小组件参数栏，可为小组件设定天气位置" />}>
                    <Button action={getLocation}>
                        <Text>获取经纬度</Text>
                    </Button>
                </Section>

                <Section
                    header={<Text>通知</Text>}
                    footer={
                        isPrecipitationEnabled ? (
                            <VStack alignment="leading">
                                <Text attributedString="· 极端天气：其定义可查看 [官方文档](https://open.caiyunapp.com/彩云天气数据格式速查表#.E5.A4.A9.E6.B0.94.E9.A2.84.E8.AD.A6.E4.BF.A1.E6.81.AF)" />
                                <Text attributedString="· 提示通知：指内容不包含数字，仅提示作用，例如“深夜了”" />
                            </VStack>
                        ) : undefined
                    }>
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
                        <Text>通知开关</Text>
                    </Toggle>
                    {isPrecipitationEnabled ? (
                        <>
                            <Picker
                                title="通知时间间隔"
                                pickerStyle="menu"
                                value={notificationInterval}
                                onChanged={(val: number) => {
                                    profile.notification.NotificationInterval = val;
                                    Storage.set(key, profile);
                                    setNotificationInterval(val);
                                }}>
                                {timeGapList.map((item) => {
                                    return item === 0 ? (
                                        <Text tag={item}>自动</Text>
                                    ) : (
                                        <Text tag={item}>{item} 分钟</Text>
                                    );
                                })}
                            </Picker>

                            <DisclosureGroup title={"通知类型"}>
                                <Toggle
                                    value={isExtremeWeatherEnabled}
                                    onChanged={(val) => {
                                        profile.notification.ExtremeWeather = val;
                                        Storage.set(key, profile);
                                        setIsExtremeWeatherEnabled(val);
                                    }}>
                                    <Text>极端天气</Text>
                                </Toggle>
                                <Toggle
                                    value={isLocalNotifyEnabled}
                                    onChanged={(val) => {
                                        profile.notification.isLocalNotify = val;
                                        Storage.set(key, profile);
                                        setIsLocalNotifyEnabled(val);
                                    }}>
                                    <Text>降水通知</Text>
                                </Toggle>
                                <Toggle
                                    value={isSurroundNotifyEnabled}
                                    onChanged={(val) => {
                                        profile.notification.isSurroundNotify = val;
                                        Storage.set(key, profile);
                                        setIsSurroundNotifyEnabled(val);
                                    }}>
                                    <Text>周边通知</Text>
                                </Toggle>
                                <Toggle
                                    value={isUselessNotificationEnabled}
                                    onChanged={(val) => {
                                        profile.notification.isUselessNotify = val;
                                        Storage.set(key, profile);
                                        setIsUselessNotificationEnabled(val);
                                    }}>
                                    <Text>提示通知</Text>
                                </Toggle>
                            </DisclosureGroup>
                        </>
                    ) : null}
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
