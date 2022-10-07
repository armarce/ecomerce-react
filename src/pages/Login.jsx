import { Button, Form } from "react-bootstrap";
import { MyFooter } from "../components/MyFooter";
import { MyNavbar } from "../components/MyNavbar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {

    const {register, handleSubmit} = useForm();

    const navigate = useNavigate();

    const submit = (data) => {
        
        axios
          .post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
          .then((res) => {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.data.user));
            navigate("/");
          })
          .catch((error) => {
            if (error.response?.status === 404) {
              alert("Credenciales inválidas");
            }
            console.log(error.response);
          });
      };

    return(

        <div id="container-login">
            <MyNavbar/>
            <main>
                <Form onSubmit={handleSubmit(submit)}>
                    <h4>Login</h4>
                    <div id="test-data">
                        <h5>Test data</h5>
                        <div><i className="fa-solid fa-envelope"></i>newusertest@gmail.com</div>
                        <div><i className="fa-solid fa-key"></i>academlo2022</div>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register("password")}/>
                    </Form.Group>
                    <Button type="submit" id="login-button">Submit</Button>
                </Form>
            </main>
            <MyFooter/>
        </div>
    )

}