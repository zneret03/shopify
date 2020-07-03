import React, {createContext} from 'react';
import {auth} from '../config/firebase';

interface Props {
    children : React.ReactNode
}

interface State {
    user : any, 
    authenticated : boolean
}

const AuthContext = createContext({});

class AuthProvider extends React.Component<Props, State> {

    // const [authenticated, setAuthenticated] = useState<{user : string | null, isAuthenticated : boolean}>({user : null, isAuthenticated : false});
    
    // const authlistener = () => {
    //     auth.onAuthStateChanged((user) => {
    //         if(user){
    //             setAuthenticated({user : user.email, isAuthenticated : true});
    //         }else{
    //             setAuthenticated({user : null, isAuthenticated : false});
    //         }
    //     });
    // }

    // useEffect(() => {
    //     authlistener();
    // }, [])

    constructor(props : any){
        super(props);
        this.state = {
            user: {},
            authenticated : false
        }
    }

    componentDidMount(){
        this.isAuthenticated();
    }

     isAuthenticated = () =>{
        auth.onAuthStateChanged((user) => {
            if(user){
                this.setState({user : user, authenticated : true});
            }else{
                this.setState({user : null, authenticated : false});
            }
        })
    }
    
    render(){
        return( 
            <div>
                <AuthContext.Provider value={this.state.user}>
                     {this.props.children}
                </AuthContext.Provider>       
            </div>                                                                             
        )
    }
    
}

export {AuthProvider, AuthContext};