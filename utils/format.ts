export function firstNonZeroIndex(arr: number[]) {
    return arr.findIndex((v: number) => v !== 0);
}

export function finalNonZeroIndex(arr: number[]) {
    return arr.length - arr.reverse().findIndex((v: number) => v !== 0);
}

export function compressTo20(data: number[]): number[] {
    const groupSize = Math.floor(data.length / 20); // = 3
    const result = [];

    for (let i = 0; i < 20; i++) {
        const start = i * groupSize;
        const end = start + groupSize;
        const group = data.slice(start, end);

        const avg = group.reduce((a, b) => a + b, 0) / group.length;
        result.push(avg);
    }
    return result;
}

export function getUint(): string {
    const unit = "°";
    return unit;
}

export function getAlartContent(alartContent: any): string {
    const alartLength = alartContent.length;
    if (alartLength === 0) return "";
    return alartLength === 1
        ? alartContent[0].title
        : alartContent[0].title + "等" + (alartLength - 1) + "项";
}

export function isDaytimeNow(): boolean {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
}
