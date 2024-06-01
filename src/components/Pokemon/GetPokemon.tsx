import React from 'react'

export type Pokemon = {
    id: string,
    name: string,
    base_experience: string,
    sprites: {
        front_default: string
    }
}

export default function GetPokemon({data}:{data: Pokemon}) {
    if(!data.name){
        return(
            <div>loading...</div>
        )
    } 
    return (
    <div>
        <div>
            <h2>Id: {data.id}</h2>
            <h2>Name: {data.name}</h2>
            <h2>Exp: {data.base_experience}</h2>
            <img className='h-40 w-40 ' src={`https://img.pokemondb.net/artwork/large/${data.name}.jpg`}/>
        </div>
    </div>
  )
}
