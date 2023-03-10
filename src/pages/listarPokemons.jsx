import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import PokemonService from '../services/pokemon.service';
import NavBar from '../components/navBar';
import { BsPencilSquare } from "react-icons/bs";
import BtnDelete from '../components/btnDelete';
import './listarPokemons.css';
import './editarPokemon.css';


export default function listarPokemons() {

  const [pokemons, setPokemons] = useState([])
  const [pokemonsTotal, setPokemonsTotal] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const pokemonService = new PokemonService()

  useEffect(() => {
    pokemonService.get(currentPage, limit).then((res) => {
      console.log(currentPage)
      console.log(res.data.data)
      setPokemons(res.data.data)
    })
    pokemonService.get().then((res) => {
      setPokemonsTotal(res.data.data)
    })
  }, [currentPage])

  return (
    <div className='d-flex justify-content-between' style={{ height: '100%' }}>

      <div className='pl-5 flex-shrink-1'>
        <NavBar />
      </div>

      <div className='p-2 w-100' style={{ height: '100%' }}>
        <Table striped bordered hover>
          <thead>
            <tr className='align-items-center'>
              <th>Nome</th>
              <th className="text-center">Tipo</th>
              <th className="text-center">Imagem</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>

            {pokemons.map(pokemon => {
              return (

                <tr key={pokemon.nome}>
                  <td className='align-middle showNome'>
                    {pokemon.nome}
                  </td>
                  <td key={pokemon.tipo} className='align-middle showTipo'>
                    <p className={`${pokemon.tipo} text_center`}>{pokemon.tipo}</p>
                  </td>
                  <td key={pokemon.pokedex} className="text-center">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex}.png`} style={{ width: "100px" }} alt="" />
                  </td>
                  <td className="text-center">
                    <BtnDelete variant="danger" param1={`${pokemon._id}`} param2={`${pokemon.nome}`} />
                    <Button href={`/editPokemon/${pokemon._id}`} className='m-3' variant="outline-warning"><BsPencilSquare /></Button>
                  </td>
                </tr>

              )
            })}

          </tbody>
        </Table>
        <div className="d-flex pagination justify-content-center">
          <Button
            variant="primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="m-2"
          >
            Anterior
          </Button>
          <Button
            variant="primary"
            disabled={currentPage === Math.ceil(pokemonsTotal.length / limit)}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="m-2"
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );

}