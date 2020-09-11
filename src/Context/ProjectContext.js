import React, { useState, createContext } from 'react';

// creatng a context
export const ProjectContext = createContext();

// we use object destructuring here, where ever if we iport this will give the function name as (AuthProvider)
// this children will be the App component
// pull out children, obAuthProviderject destructuring props 
export default ({ children }) => {
    // the data we want to pass to the context using useState method.
    const [projectInfo, setProjectInfo] = useState(null);

    

    return (
        <div>
            {/* set the data what we going to use in the contextApi, inside the provider's value property if browser is loaded. */}            
            <ProjectContext.Provider value = {{ projectInfo, setProjectInfo }}>
            {children}
            </ProjectContext.Provider>
        </div>

    )

}