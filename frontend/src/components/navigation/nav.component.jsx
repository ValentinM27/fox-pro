import React  from 'react';
import { useNavigate } from "react-router-dom";

import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import logo_nav from '../../images/LOGO2.png'

/**
 * Barre de navigation
 */
const Navigation = () => {

    const navigate = useNavigate();

    /**
     * Permet de gérer la déconnexion
     * @todo : add user.services.js
     */
    const handleLogout = () => {
        if(localStorage.getItem('token') !== undefined) {
            localStorage.setItem('token', undefined);
            navigate('/');
            window.location.reload(false);
        }
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
                    
                    {localStorage.getItem('token') !== "undefined" ? 
                    /* Dans le cas d'un utilisateur connecté */
                    ( 
                        <Nav className="ms-auto float-left">
                            <Nav.Link href="/projects">Mes projets</Nav.Link>
                            <Nav.Link href="/enterprise">Mes entreprises</Nav.Link>
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