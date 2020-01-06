import { useState, useMemo } from 'react';

// 倒计时
export function useCountDown(startSecond: number  = 60) {

    // 倒计时秒数
    const [ second, setSecond ] = useState(startSecond);

    // 定时器Id
    let timer: NodeJS.Timeout;

    // 倒计时开始方法
    const startFn = () => {

        // 先立刻执行一下
        setSecond(startSecond - 1);

        // 然后定时器定时执行
        timer = setInterval(() => {
            setSecond((prevSecond: number) => {
                if (prevSecond < 1) {
                    clearInterval(timer);
                    return startSecond;
                } else {
                    return prevSecond - 1;
                }
            })
        }, 1000);
    };

    return {
        second,
        start: startFn
    };
}