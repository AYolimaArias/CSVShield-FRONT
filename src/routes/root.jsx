import { Link, Outlet } from "react-router-dom";
import Button from "../components/Button/";

export const Root = () => {
  return (
    <div className=" flex justify-center m-10">
      <div className="flex flex-col">
        <div>
          <h1 className=" flex justify-center">Bienvenido</h1>
          <h1 className="flex justify-center font-title font-bold mb-5">
            Sistema de Carga de Datos
          </h1>
        </div>
        <div className="flex justify-center  mb-4">
          <Link to={`/signup`}>
            <Button className=" mr-4 pt-0 pb-1"> Signup</Button>
          </Link>
          <Link to={`/login`}>
            <Button className=" pt-0 pb-1">Login</Button>
          </Link>
        </div>
        <Outlet />
        <h1 className=" flex justify-center mt-24">By Angélica Arias</h1>
      </div>
    </div>
  );
};
