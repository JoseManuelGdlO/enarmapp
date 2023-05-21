export function transformTextb64(text: string, convert = true) {
    try {
        if(convert) {
            return btoa(text)
        } else {
            return atob(text)
        }

    } catch (error) {
        console.log(error);
        return text
    }
}