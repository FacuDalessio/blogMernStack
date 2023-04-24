import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Request } from '../../helpers/Request';
import { Url } from '../../helpers/Url';

export const Create = () => {

  const { object, change } = useForm({});
  const [created, setCreated] = useState("no_enviado");


  const createArticle = async e => {
    e.preventDefault();
    
    const { data } = await Request(Url.urlCreateArticle, "POST", object);
    
    if (data.status === "Success") {
      let fileInput = document.querySelector("#file");
      console.log(fileInput)
      if (fileInput.files[0]) {
        let formData = new FormData();
        formData.append("file", fileInput.files[0]);
        let upload = await Request(Url.urlUploadImage+data.article._id, "POST", formData, true);
      }
      setCreated(data.status);
    }else{

      setCreated(data.status);
    }
  }

  return (
    <div className='jumbo'>

      <h1>Crear Articulo</h1>
      <strong>{created === "Success" ? "Creado correctamente !" : ""}</strong>
      <strong>{created === "Error" ? "Error en los datos enviados !" : ""}</strong>

      <form className='form' onSubmit={createArticle}>

        <div className='form-group'>
          <label htmlFor='title'>Titulo</label>
          <input type='text' name='title' onChange={change} placeholder='Min 5 carac' />
        </div>

        <div className='form-group'>
          <label htmlFor='content'>Contenido</label>
          <textarea name='content' onChange={change} placeholder='Min 5 carac' />
        </div>

        <div className='form-group'>
          <label htmlFor='file'>Imagen</label>
          <input type='file' name='file' id='file'/>
        </div>

        <div className='form-group'>
          <input type='submit' value="Crear" />
        </div>

      </form>

    </div>
  )
}
