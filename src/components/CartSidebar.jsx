import { useEffect } from "react";
import { Button, Card, ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCartItemThunk, getCartThunk, purchaseCartCheckoutThunk } from "../store/slices/cart.slice";

export const CartSidebar = ({ show, handleClose }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getCartThunk());
    }, []);

  const delProductCart = id => {

    dispatch(deleteCartItemThunk(id)); 
    
    }

    const checkout = () => {

        dispatch(purchaseCartCheckoutThunk());

    }

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
          {cart?.map(product => (
            <Card key={product.id} className="cart-card">
                <Card.Header>
                    {product.brand}
                </Card.Header>
                <h5 onClick={() => navigate(`/product/${product.id}`)}>
                    {product.title}
                </h5>
                <Card.Body>
                    <div className="info-product-cart">
                        <div className="quantity">{product.productsInCart.quantity}</div>
                        <div className="total">Total: <b>${Number(product.productsInCart.quantity) * Number(product.price)}</b></div>
                    </div>
                    <Button variant="danger" className="delete-item" onClick={() => delProductCart(product.id)}>
                        <i className="fa-solid fa-trash"></i>
                    </Button>
                </Card.Body>
            </Card>
        ))}
        {cart.length > 0 ? (
            <button className="checkout" onClick={()=> checkout()}>Checkout</button>
            ):

        (<i>No products</i>
            )
        }
      </Offcanvas.Body>
    </Offcanvas>
  );
};