import { HStack, Image, Notification, Text, VStack } from "scripting";
// import { HourlyView } from "./utils/component";

function NotificationView() {
    const info: any = Notification.current;
    const body = info.request.content.title;
    console.log(body);

    return (
        <VStack
            frame={{
                height: 300,
            }}>
            <Text font="headline">Title</Text>
            <HStack>
                <Image
                    systemName="globe"
                    resizable
                    scaleToFit
                    frame={{
                        width: 32,
                        height: 32,
                    }}
                    foregroundStyle="accentColor"
                />
                <Text>A custom notification content</Text>
            </HStack>
        </VStack>
    );
}

Notification.present(<NotificationView />);
