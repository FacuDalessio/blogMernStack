import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Url } from '../../helpers/Url';

export const Slidebar = () => {

  const navigate = useNavigate();

  const search = e => {
    e.preventDefault();
    
    let searching = e.target.searching.value;
    navigate("/search/" + searching, {replace: true})
  }

  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={search}>
          <input type="text" name='searching'/>
          <input type='submit' value="Buscar"/>
        </form>
      </div>

      {/* <div className="add">
        <h3 className="title">Añadir peliculas</h3>
        <form>
          <input type="text" placeholder="Titulo" />
          <textarea placeholder="Descripcion"></textarea>
          <input type="submit" value="Guardar" />
        </form>
      </div> */}
    </aside>
  )
}
