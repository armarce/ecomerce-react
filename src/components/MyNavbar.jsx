import { useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import { CartSidebar } from "./CartSidebar";
export const MyNavbar = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const reload = () => {

        dispatch(getProductsThunk());

        navigate('/');
        
    }

    const logout = () => {
      localStorage.setItem("token", "");
      navigate("/login");
    };
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(

        <>
            <Navbar id="navbar" sticky="top" expand="lg">
                <Container fluid>
                    <Navbar.Brand onClick={()=> reload()}>E-Comerce</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <i className="fa-solid fa-box-archive" onClick={()=> navigate('/purchases/')}></i>
                    </Navbar.Text>
                    <Navbar.Text>
                        <i className="fa-solid fa-cart-shopping" onClick={handleShow}></i>
                    </Navbar.Text>
                    <Navbar.Text>
                        <i className="fa-solid fa-user" onClick={()=> navigate('/login/')}></i>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CartSidebar show={show} handleClose={handleClose}/>
        </>

    )

} 