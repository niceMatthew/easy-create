import React, { useEffect, useRef, ReactElement } from 'react';
import styles from './LoadMore.module.scss';

interface Iprops {
    className?: string
    loadAble: boolean
    children?: ReactElement[]
    loadMoreFn: () => any
}

// 这TM是个bug，这么写只能同时存在一个加载更多组件
let componentLoadAble: boolean = true;

// 上拉加载更多
const LoadMore: React.FC<Iprops> = (props: Iprops) => {

    const { className, children, loadAble, loadMoreFn } = props;
    const $refs = useRef(document.createElement('div'));

    componentLoadAble = loadAble;

    useEffect(() => {
        const $doms = $refs.current;
        $doms.addEventListener('scroll', debounce(scrollFn));
    }, []);

    const debounce = (fn: () => void, delay: number = 500) => {
        let timer: any;
        return () => {
            if (timer) {
                clearTimeout(timer);

                timer = setTimeout(() => {
                    fn();
                }, delay);
            } else {
                timer = setTimeout(() => {
                    fn();
                }, delay);
            }
        }
    }

    // 滑动时触发方法
    const scrollFn = () => {
        const $scroll = $refs.current,              // 获取滑动元素节点
            scrollTop = $scroll.scrollTop,          // 滑动过的距离
            scrollHeight = $scroll.scrollHeight,    // 滑动区域高度
            clientHeight = $scroll.clientHeight;    // 可视区域高度

        // 距离底部不到100px高度时执行加载方法
        if (scrollHeight - (scrollTop + clientHeight) < 100) {
            if (componentLoadAble) {
                loadMoreFn();
            }
        } 
    }

    return (
        <div 
            ref = { $refs }
            className = { `${ styles.loadMore } ${ className }` }>
            {
                children
            }
            {
                componentLoadAble 
                ? <div className = { styles.label }>广告加载中...</div>
                : ''
            }
        </div>
    )
}

export default LoadMore;