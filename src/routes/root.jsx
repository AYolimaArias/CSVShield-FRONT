import { Link, Outlet } from "react-router-dom";
import Button from "../components/Button/";

export const Root = () => {
  return (
    <div className=" flex justify-center m-10">
      <div className="flex flex-col">
        <div>
          <h1 className=" flex justify-center text-3xl mb-11">Bienvenido</h1>
          <h1 className="flex justify-center font-title font-bold mb-16 text-4xl">
            Sistema de Carga de Datos
          </h1>
        </div>
        <div className="flex justify-center  mb-4">
          <Link to={`/signup`}>
            <Button size="lg" className=" mr-4 ">
              {" "}
              Signup
            </Button>
          </Link>
          <Link to={`/login`}>
            <Button size="lg" className=" ">
              Login
            </Button>
          </Link>
        </div>
        <Outlet />
        <h1 className=" flex justify-center mt-48">By Angélica Arias</h1>
      </div>
    </div>
  );
};
