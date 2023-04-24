import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Index } from "../components/pages/Index.jsx";
import { Article } from "../components/pages/Article.jsx";
import { Articles } from "../components/pages/Articles.jsx";
import { Header } from "../components/layout/Header.jsx";
import { Nav } from "../components/layout/Nav.jsx";
import { Slidebar } from '../components/layout/Slidebar.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { Create } from '../components/pages/Create.jsx';
import { Search } from '../components/pages/Search.jsx';
import { Update } from '../components/pages/Update.jsx';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <section id='content' className='content'>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/index' element={<Index />} />
          <Route path='/article/:id' element={<Article />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/articles' element={<Articles />} />
          <Route path='/create' element={<Create />} />
          <Route path='/search/:searching' element={<Search />} />
          <Route path='*' element={
            <div className='jumbo'>
              <h1>404 Not Found</h1>
            </div>
          } />
        </Routes>
      </section>

      <Slidebar />
      <Footer />
    </BrowserRouter>
  )
}
