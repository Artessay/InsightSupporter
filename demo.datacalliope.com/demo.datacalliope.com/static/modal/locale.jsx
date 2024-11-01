import defaultLocale from '../locale/default';
let runtimeLocale = Object.assign({}, defaultLocale.Modal);
export function changeConfirmLocale(newLocale) {
    if (newLocale) {
        runtimeLocale = Object.assign(Object.assign({}, runtimeLocale), newLocale);
    }
    else {
        runtimeLocale = Object.assign({}, defaultLocale.Modal);
    }
}
export function getConfirmLocale() {
    return runtimeLocale;
}
