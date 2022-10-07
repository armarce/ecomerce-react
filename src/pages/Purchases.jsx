import { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MyFooter } from "../components/MyFooter";
import { MyNavbar } from "../components/MyNavbar";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

export const Purchases = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const purchases = useSelector(state => state.purchases);

    useEffect(() => {
        
        dispatch(getPurchasesThunk());

    }, []);

    const getDate = date => {
        return new Date(date).toLocaleDateString("en-US", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
      };

    return(
        <div id="container-purchases">
            <MyNavbar/>
            <main>
                <h2>My purchases</h2>
                    {
                        purchases.map(purchase => (

                        <Card className="purchase-card">
                            <Card.Header>{getDate(purchase.createdAt)}</Card.Header>
                            <ListGroup variant="flush">

                                {purchase.cart.products.map(product => (

                                    <ListGroup.Item key={product.id} className="purchase-info">
                                        <span class="link-product" onClick={() => navigate(`/product/${product.id}`)}>{product.title}</span>
                                        <div class="quantity">{product.productsInCart.quantity}</div>
                                        <span><b>${Number(product.price) * product.productsInCart.quantity}</b></span>
                                    </ListGroup.Item>

                                ))
                            }
                            </ListGroup>
                        </Card>
                        ))

                    }
            </main>
            <div className="clear"></div>
            <MyFooter/>
        </div>
    )
}