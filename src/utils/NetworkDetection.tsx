import React, {Component} from 'react';
import {WifiOff} from 'react-feather';

export default function (ComposedComponent : any) {
    class NetworkDetection extends Component {

        state = {
            isDisconnected : false
        }

        componentDidMount() {
            this.handleConnectionChange = this.handleConnectionChange.bind(this);
            
            window.addEventListener('online', this.handleConnectionChange);
            window.addEventListener('offline', this.handleConnectionChange);
        }

        componentWillUnmount(){
            window.removeEventListener('online', this.handleConnectionChange);
            window.removeEventListener('offline', this.handleConnectionChange);
        }

        handleConnectionChange(){
            const connection = navigator.onLine ? 'online' : 'offline';

            if(connection === 'online'){
                const webPing = setInterval(() => {
                    fetch('google.com', {
                        mode : 'no-cors'
                    }).then(() => {
                        this.setState({isDisconnected : false}, () => {
                            return clearInterval(webPing);
                        });
                    }).catch(() => this.setState({isDisconnected : true}))
                }, 2000)

                return;
            }

            return this.setState({isDisconnected : true});
        }

        render(){
            const {isDisconnected} = this.state;
    
            return(
                <div>
                    {isDisconnected ? (
                        <div className="bg-red-500 py-1 flex items-center justify-center">
                            <i className="mr-3"><WifiOff color="#FFF" size="18"/></i>
                            <span className="text-white text-sm">Internet Connection is Lost</span>
                        </div>
                    ) : (
                        null
                    )}
                    <ComposedComponent {...this.props}/>
                </div>
            )
        }
    
    }

    return NetworkDetection;
}