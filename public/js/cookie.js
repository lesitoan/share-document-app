export function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (3 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookieValue = (name) => {
    const regex = new RegExp(`(^| )${name}=([^;]+)`)
    const match = document.cookie.match(regex)
    if (match) {
        return match[2];
    }
}
