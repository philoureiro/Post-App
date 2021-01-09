import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//background-color:  #614E5A;
function Navbar() {

    const dispatch = useDispatch();
    return (
        <nav className="navbar navbar-expand-lg">
            <i className="fas fa-book-reader text-white fa-2x"></i>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars text-white"></i>

            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ml-3">

                    {
                        useSelector(state => state.usuarioLogado) === true ?
                            <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/posts/meus">Meus Posts<span className="sr-only">(current)</span></Link>
                                    <Link className="nav-link" to="/newPost">Publicar Posts<span className="sr-only">(current)</span></Link>
                                    <Link className="nav-link" onClick={() => dispatch({ type: 'LOGOUT' })}>Sair<span className="sr-only">(current)</span></Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
                                    <Link className="nav-link" to="/login">Login<span className="sr-only">(current)</span></Link>
                                    <Link className="nav-link" to="/newUser">Cadastrar<span className="sr-only">(current)</span></Link>
                                </li>
                            </>
                    }

                </ul>
            </div>
        </nav>
    )
}

export default Navbar;