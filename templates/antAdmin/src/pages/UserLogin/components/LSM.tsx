import React,{ useEffect } from 'react';


export default function(props: any) {
    const dynamicLoadJs = (url: string, callback?: any) => {
        const head = document.getElementsByTagName("head")[0];
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        if (typeof callback === "function") {
            script.onload = (script as any).onreadystatechange = function() {
            if (
                !this.readyState ||
                this.readyState === "loaded" ||
                this.readyState === "complete"
            ) {
                callback();
                script.onload = (script as any).onreadystatechange = null;
            }
            };
        }
        head.appendChild(script);
    }
    useEffect(() => {
        dynamicLoadJs("//captcha.luosimao.com/static/js/api.js");
        (window as any).getResponse = (resp: any) => {
            const els = document.getElementsByName("luotest_response");
            if (els.length === 1 && (els[0] as any).value === resp) {
                props.success(resp)
            } else {
                // eslint-disable-next-line
                if((window as any).LUOCAPTCHA ) { (window as any).LUOCAPTCHA.reset()}
            }
        }
    },[props.refresh])
    return  <div
                className="l-captcha"
                data-site-key="6949f4741ed7f1f449236a091befa93f"
                data-width="100%"
                data-callback="getResponse"
            />
}