import React, { useEffect, useState } from 'react'
import { Url } from '../../helpers/Url';
import { Request } from '../../helpers/Request';
import { ListArticle } from './ListArticle';
import { useParams } from 'react-router-dom';

export const Search = () => {

  const [articles, setArticles] = useState([]);
  const [chargin, setChargin] = useState(true);
  const params = useParams();

  useEffect(() => {
    getArticles();
  }, [])

  useEffect(() => {
    getArticles();
  }, [params])

  const getArticles = async () =>{

    const {data} = await Request(Url.urlSearch + params.searching, "GET");
    if (data.status === "Success") {
      setArticles(data.articlesFinded);
    }else{
      setArticles([]);
    }
    setChargin(false);
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

