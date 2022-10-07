import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MyNavbar } from "../components/MyNavbar";
import { MySeach } from "../components/MySearch";
import { MySidebar } from "../components/MySidebar";
import { MyFooter } from '../components/MyFooter';
import { postCartThunk } from "../store/slices/cart.slice";

export const Home = () => {
    
    const products = useSelector(state => state.products);

    const navigate = useNavigate();

    const addProductCart = id => {

        useDispatch(postCartThunk({"id": id, "quantity": 1}));

    }

    return(

        <div id="container">
            <MyNavbar/>
            <MySidebar/>
            <main>
                
                <MySeach/>
                <ul className="products">
                {
                    products?.map(product => (

                        <li key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                            <Card style={{ width: '18rem' }} >
                                <Card.Img variant="top" src={product.productImgs[1]} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                </Card.Body>
                                <Card.Body>
                                <div className="footer-card">
                                    <span>${product.price}</span>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </div>
                                </Card.Body>
                            </Card>
                        </li>
        
                    ))
                }
                </ul>
            </main>
            <MyFooter/>
        </div>
    
    )
}