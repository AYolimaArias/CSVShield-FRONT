import { Link, Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div>
      <div>
        <h1>Sistema de Carga de Datos</h1>
      </div>
      <div>
        <Link to={`/signup`}>
          <button className="bg-green-500"> Signup</button>
        </Link>
        <Link to={`/login`}>
          <button>Login</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
