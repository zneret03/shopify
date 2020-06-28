import React from 'react';

interface Props {
    children : React.ReactNode
}

const Home: React.FC<Props> = ({children}) => {
    return(
        <div>
            <div className="font-mono">
                {children}
            </div>
        </div>
    )
}

export default Home;