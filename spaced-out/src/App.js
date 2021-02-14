import React, { useState } from 'react'
import './App.css';

const asParams = (params) =>
  new URLSearchParams(Object.entries(params));

const getArtist = async(name) => {
  try {
    const response = await fetch(`/api/artist?${asParams({name})}`);
    if (!response.ok) {
      throw new Error("Unable to fetch data")
    }
    return response.json();
  } catch (error){
    console.error(error)
  }
}

const App = () => { 
  const [artistQuery, setArtistQuery] = useState("")


  return (
    <form onSubmit={event => {
      event.preventDefault()
      console.log("Do it!", artistQuery)
      getArtist(artistQuery)
    }}>
      <label>
        Start Artist
        <input
          type="text"
          name="name"
          placeholder="eg. Grimes" 
          value={artistQuery}
          onChange={(event) => setArtistQuery(event.currentTarget.value)}/>
      </label>
      <button type="submit">Search!</button>
    </form>
  );
}

export default App;
