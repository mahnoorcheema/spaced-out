import React from "react";

/*


   ContextProvider < set, callback to update it >
  /        \
 Summary  Search
/ 
Summary
|
Summary <getUniqueArtists, addToSeenArtists> 

*/

const SeenArtistsContext = React.createContext(null);
SeenArtistsContext.displayName = "SeenArtistsContext";

export const SeenArtistsContextProvider = ({ initialArtists, children }) => {
    const seenArtistsSet = React.useMemo(() =>
        new Set(initialArtists.map(artist => artist.id)),
        [initialArtists]
    );
        
    const value = React.useMemo(() => {
        
        const isArtistsUnique = (artist) =>
            !seenArtistsSet.has(artist.id);
        
        const addToSeenArtists = (artist) => 
            seenArtistsSet.add(artist.id);
        
        return { isArtistsUnique, addToSeenArtists };
    
    }, [seenArtistsSet])

    return <SeenArtistsContext.Provider value={value}>
        {children}
    </SeenArtistsContext.Provider>
}

export const useSeenArtists = () => {
    const something = React.useContext(SeenArtistsContext);
    if (something === null) throw new Error(`SeenArtistsContext must be used from inside a provider`)
    return something;
};
