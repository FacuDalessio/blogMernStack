import React from 'react'
import { Link } from 'react-router-dom'

export const Index = () => {
  return (
    <div className='jumbo'>
      <h1>Bienvenido al blog con React</h1>
      <p>Blog desarrollado con MERN stack</p>
      <Link to="/articles" className='button'>Ver articulos</Link>
    </div>
  )
}
