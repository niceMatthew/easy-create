import React, { useEffect } from 'react';    
import styles from "./index.module.scss"

export default function UserContainer(props: any) { 

    return  <div className={styles.container}>
                <div className={styles.formWrapper} style={props.style}>
                {!props.showTitle &&
                    <div className={styles.center} style={{marginBottom: "30px"}}> 
                        <div className={styles.title}/>
                    </div> 
                }
                    {props.children}
                </div>
            </div> 
}