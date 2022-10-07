import { Button, Card, ListGroup} from "react-bootstrap";
import { MyFooter } from "../components/MyFooter";
import { MyNavbar } from "../components/MyNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const User = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    if(localStorage.getItem("token") === null){

        navigate('/login/');

    }

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/login/');
    }

    return(

        <div id="container-login">
            <MyNavbar/>
            <main>
                <Card id="user">
                    <i className="fa-regular fa-user icon-user"></i>
                    <Card.Body>
                        <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item><i className="fa-solid fa-envelope"></i> {user.email}</ListGroup.Item>
                        <ListGroup.Item><i className="fa-solid fa-square-phone"></i> {user.phone}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Button variant="danger" onClick={()=> logout()}>Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></Button>
                    </Card.Body>
                </Card>
            </main>
            <MyFooter/>
        </div>
    )

}