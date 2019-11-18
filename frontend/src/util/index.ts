export function getCookie(name: string) {
    const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

export function deleteCookie(name: string) {
    document.cookie = name + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}

