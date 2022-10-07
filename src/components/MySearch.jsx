import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getProductsThunk, searchProducts } from "../store/slices/products.slice";

export const MySeach = () => {

    const [textInput, setTextInput] = useState('');
    const dispatch = useDispatch();
    
    const filterProducts = e => {

        e.preventDefault();

        if(textInput){

            dispatch(searchProducts(textInput));

        }else{

            dispatch(getProductsThunk());

        }

    }

    return(
        <form onSubmit={e => filterProducts(e)}>
            <InputGroup>
            <Form.Control
            placeholder="Search product"
            value={textInput} 
            onChange={e => setTextInput(e.target.value)}
            />
            <Button variant="outline-secondary" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
            </InputGroup>
        </form>
    )

}