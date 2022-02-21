import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import PersonService from '../../services/person.service.js';

import logo_nav from '../../images/LOGO2.png'

/**
 * Barre de navigation
 */
const Navigation = () => {
    const [ show, setShow ] = useState(false);
    const initValue = {q : ""}
    const [ value, setValue ] = useState(initValue);

    const navigate = useNavigate();

    /**
     * Permet de gérer la déconnexion
     */
    const handleLogout = () => {
        const _status = PersonService.logout();
        if(_status) {
            navigate('/');
            window.location.reload(false);
        } 
    }

    /**
     * Permet d'effectuer une recherche
     */
    const handleSearch = () => {
        setShow(false);
        navigate({
            pathname: '/search',
            search: `?q=` + value.q
        })
        window.location.reload();
    }

    /**
     * Permet de gérer la recherche
     */
    const handleChange = (event) => {
        const {name, value} = event.target;
        setValue({...value, [name]: value});
    }

    return (
    <div>
        <Navbar className="navbar navbar-dark bg-dark" bg="light" sticky="top" expand="xl">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt="Logo de Fox'Pro"
                        src={logo_nav}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Fox'Pro
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    
                    {PersonService.isAuthenticated() ? 
                    /* Dans le cas d'un utilisateur connecté */
                    ( 
                        <Nav className="ms-auto float-left">

                            <NavDropdown title="Rechercher" show={show} id="basic-nav-dropdown" onClick = {() => setShow(true)}>
                                <NavDropdown.Item>
                                    <form className="form-inline">
                                        <input 
                                            className="form-control mr-sm-2"
                                            onChange={ handleChange } 
                                            type="search" placeholder="Tapez un nom ..."
                                            aria-label="Search" 
                                            name="q"
                                            value={value.q}
                                        />
                                        <hr />
                                        <div className="d-flex justify-content-center">
                                            <button onClick={() => handleSearch()} className="btn1 btn-dark" type="submit">Rechercher</button>
                                            <button onClick = {() => {setShow(false); window.location.reload();}} className="btn1 btn-dark space red" type="submit">Fermer</button>
                                        </div>
                                    </form>
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="/myProjects">Membre</Nav.Link>

                            <NavDropdown title="Mes entreprises" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/enterprise">Voir mes entreprises</NavDropdown.Item>
                                <NavDropdown.Item href="/enterprise/create">Créer une nouvelle entreprise</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="/profil">Mon profil</Nav.Link>

                            <Button onClick={handleLogout} variant="danger">Déconnexion</Button>{' '}
                        </Nav>                       
                    ) 
                    :
                    /* Dans le cas d'un utilisateur non connecté */
                    (
                        <Nav className="ms-auto">
                            <Nav.Link href="register">Créer un compte</Nav.Link>
                            <Nav.Link href="login">Connexion</Nav.Link>
                        </Nav>
                    )}

                </Navbar.Collapse>

            </Container>
        </Navbar>
    </div>)
}

export default Navigation;