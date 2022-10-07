import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByCategoryIdThunk, getProductsByPriceThunk} from "../store/slices/products.slice";

export const MySidebar = () => {

  const categories = useSelector(state => state.categories);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const dispatch = useDispatch();

  const changeCateory = id => {

    dispatch(getProductsByCategoryIdThunk(id));

  }

  const filterByPrice = () => {

    dispatch(getProductsByPriceThunk(start, end));
    
  }

  return(

      <aside id="sidebar">
        <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Price</Accordion.Header>
          <Accordion.Body>
            <form id="price" onSubmit={() => filterByPrice()}>
              <label htmlFor="start">
                <div>From</div><input type="number" value={start} onChange={e => setStart(e.target.value)} id="start"/>
              </label>
              <label htmlFor="end">
                <div>To</div><input type="number" value={end} onChange={e => setEnd(e.target.value)}  id="end"/>
              </label>
              <Button type="submit">Filter price</Button>
            </form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Categories</Accordion.Header>
          <Accordion.Body>
            <ul id="categories">
              {categories.map(category => (

                <li key={category.id} onClick={() => changeCateory(category.id)}>{category.name}</li>

              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </aside>
  )

}