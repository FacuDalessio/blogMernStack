import React, { useEffect, useState } from 'react'
import { Url } from '../../helpers/Url';
import { Request } from '../../helpers/Request';
import { ListArticle } from './ListArticle';

export const Articles = () => {

  const [articles, setArticles] = useState([]);
  const [chargin, setChargin] = useState(true);

  useEffect(() => {
    getArticles();
  }, [])

  const getArticles = async () =>{

    const {data} = await Request(Url.urlGetArticles, "GET");

    if (data.status === "Success") {
      setArticles(data.articles);
      setChargin(false);
    }
  }

  return (
    <>
      {
        chargin ? (
          <h1>Cargando...</h1>
        ) :(
          articles.length >= 1 ? (
            <ListArticle articles={articles} setArticles={setArticles}/>
          ) : (
            <h1>No hay articulos</h1>
          )
        )
      }
    </>
  )
}
