import React from 'react'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li><NavLink to="/index">Inicio</NavLink></li>
        <li><NavLink to="/articles">Articulos</NavLink></li>
        <li><NavLink to="/create">Crear Articulos</NavLink></li>
        <li><NavLink to="/contact">Contacto</NavLink></li>
      </ul>
    </nav>
  )
}
