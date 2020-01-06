import React from 'react';
import {Button} from 'antd';

let clock: any;

interface IProps {
    onClick: any,
    countDown?: any
}
interface IState {
    totalTime: number,
    content: string
}
export default class  CountBtn extends React.Component<IProps, IState>{
    constructor(props:IProps) {
        super(props)
        this.state = {
            totalTime : 60,
            content: '发送验证码'
        }
    }
    // const [totalTime, setTotalTime] = useState(12);
    // const [content, setContent] = useState('发送验证码');
    countDown  = () => {    
        const {content } = this.state;
        this.props.onClick(()=>{
            if(content === '发送验证码' ) {
                this.setState({content: '60s'})
                clock = window.setInterval( () => {
                    this.setState((state,props) => {
                        if(state.totalTime === 1) {
                            window.clearInterval(clock);
                            return {
                                content: '发送验证码', 
                                totalTime: 60
                            } 
                        } else {
                            return {
                                content: (state.totalTime-1)+'s',
                                totalTime: state.totalTime - 1
                            }
                        }
                        
                    })
                },1000)
            }
       }, content === '发送验证码' )
    }
    componentDidMount() {
        clearInterval(clock)
    }

    render() {
        const {content} = this.state;
        return (
            <Button 
                onClick={this.countDown} 
                type="primary" 
                block={true} 
                ghost={true}
                style={{
                    height: '40px'
                }}>{content}</Button>)
    }
}

