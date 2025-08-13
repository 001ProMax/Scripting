import { fetch, Widget } from "scripting";

function processDevData(data: any) {
    console.log("DEV");
    const result = data.result;

    let isAlert = false;
    let precipitationBody: number[] = [];
    let currentWeather: string = result.realtime.skycon;

    isAlert = true;

    currentWeather = "STORM_RAIN";

    // precipitationBody = Array.from({ length: 60 }, (_, i) => i * 0.01);
    precipitationBody = Array.from({ length: 60 }, () => Math.random());
    // [0, 1, 2, 57, 58, 59].forEach((i) => (precipitationBody[i] = 1));

    // 强制前三项为 1
    // Object.assign(precipitationBody, { 0: 1, 1: 1, 2: 1 });

    // 强制前三项为 0
    // Object.assign(precipitationBody, { 0: 0, 1: 0, 2: 0 });

    // 关闭降水预测
    precipitationBody = Array.from({ length: 60 }, () => 0);

    return {
        ...data,
        result: {
            ...result,
            alert: {
                ...result.alert,
                adcodes: [
                    { adcode: 110000, name: "北京市" },
                    { adcode: 110100, name: "北京城区" },
                    { adcode: 110101, name: "东城区" },
                ],
                content: isAlert ? alertContentBody : [],
            },
            minutely: {
                ...result.precipitation,
                precipitation: precipitationBody,
                description: "最近的降雨带在西北32公里外呢",
            },
            realtime: {
                ...result.realtime,
                skycon: currentWeather,
            },
        },
    };
}

const alertContentBody = [
    {
        province: "北京市",
        status: "预警中",
        code: "0201",
        description:
            "东城区气象台27日10时25分发布暴雨蓝色预警,预计27日傍晚至28日上午，东城区将出现明显降雨，部分地区小时雨强可达30毫米以上，个别点6小时累计降雨量可达50毫米以上，请注意防范。（数据来源：国家预警信息发布中心）",
        regionId: "",
        county: "东城区",
        pubtimestamp: 1753583100,
        latlon: [39.928359, 116.416334],
        city: "北京城区",
        alertId: "11010141600000_20250727102615",
        title: "东城区气象台发布暴雨蓝色预警[IV/一般]",
        adcode: "110101",
        source: "国家预警信息发布中心",
        location: "北京市东城区",
        request_status: "ok",
    },
];

export async function fetchColorfulClouds(latitude: number, longitude: number) {
    if (Widget.parameter === "dev") {
        const { devData } = await import("../test/body.js");
        return processDevData(devData);
    }

    if (!latitude || !longitude) throw new Error("定位错误");
    const hostname = "https://colorfulclouds.trigram-masques-8r.workers.dev";
    const response = await fetch(`${hostname}/v2.6/apitoken/${longitude},${latitude}/weather?alert=true`);
    const data = await response.json();
    if (data.code === 404) throw new Error("API错误");

    return data;
}

export async function getLocation() {
    let location;
    let isCurrentLocation = false;
    const key = "Location";

    if (Widget.parameter) {
        if (Widget.parameter === "dev") {
            location = { latitude: 1, longitude: 1 } as LocationInfo;
        } else {
            try {
                location = JSON.parse(Widget.parameter) as LocationInfo;
                isCurrentLocation = false;
            } catch (e) {
                throw new Error("参数错误");
            }
        }
    } else {
        location = await Location.requestCurrent();
        isCurrentLocation = true;
        if (!location) {
            location = Storage.get(key) as LocationInfo;
            if (!location) throw new Error("请先授权定位");
        } else {
            Storage.set(key, location);
        }
    }

    return {
        latitude: location?.latitude,
        longitude: location?.longitude,
        isCurrentLocation,
    };
}
