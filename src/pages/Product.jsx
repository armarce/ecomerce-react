import { useParams } from "react-router-dom";
import { MyFooter } from "../components/MyFooter";
import { MyNavbar } from "../components/MyNavbar";
import { getProductThunk } from "../store/slices/product.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Carousel, Breadcrumb, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postCartThunk } from "../store/slices/cart.slice";

export const Product = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const myProduct = useSelector(state => state.product);

    const products = useSelector(state => state.products);

    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    
    useEffect(() => {

        dispatch(getProductThunk(id));

    }, [id]);

    const changeQuantity = mode => {

        if(mode == 'minus'){

            if(quantity > 1){

                setQuantity(quantity - 1);

            }

        }

        if(mode == 'plus'){

            setQuantity(quantity + 1);

        }

    }

    const addProductCart = () => {

        if(localStorage.getItem("token") === null){

            navigate('/login/');
    
        }

        dispatch(postCartThunk({"id": id, "quantity": quantity}));

    }
    
    return(
        <div id="container-product">
            <MyNavbar/>
            <main>
                <Breadcrumb id="breadcrumb">
                    <Breadcrumb.Item href="/#/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                        {myProduct.title}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <section id="carousel">
                    <Carousel variant="dark">
                        {myProduct.productImgs?.map(img => (
                            <Carousel.Item key={img}>    
                                <img src={img}/>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </section>
                <section id="description">
                    <h2>{myProduct.title}</h2>
                    <p>
                        {myProduct.description}
                    </p>
                    <div id="info">
                        <span className="label">Price</span>
                        <span className="label">Quantity</span>
                        <span><b>${myProduct.price}</b></span>
                        <div id="controls">
                            <button><i className="fa-solid fa-minus" onClick={() => changeQuantity('minus')}></i></button>
                            <div id="value">{quantity}</div>
                            <button><i className="fa-solid fa-plus" onClick={() => changeQuantity('plus')}></i></button>
                        </div>
                    </div>
                    <button id="add-cart" onClick={()=> addProductCart()}>Add to cart <i className="fa-solid fa-cart-shopping"></i></button>
                </section>
                <section id="related">
                    <ul className="products">
                    {
                        products?.filter(product => product.category.name === myProduct.category && product.id != myProduct.id).map(product => (

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
                </section>
            </main>
            <MyFooter/>
        </div>
    )

}