export class ClientCommon {
    public static guid() {
        const timestamp = Date.now().toString(36); // Convert current timestamp to base 36
        const randomString = Math.random().toString(36).substr(2, 5); // Generate a random string

        return `${timestamp}${randomString}`;
    }
}
