import moment from "moment";

export function disabledDate(date: any) {
    // console.log(date);
    if (date) {
        const nowStamp = new Date().valueOf();
        const dateStamp = date.valueOf();
        const yearStamp = 365 * 24 * 60 * 60 * 1000;

        return (dateStamp > nowStamp) || (dateStamp < (nowStamp - yearStamp))
    } else {
        return false;
    }
}