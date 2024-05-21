import { useAuth } from "../../contexts/authContext";
import Authenticated from "../Authenticated/Authenticated";
import Unauthenticated from "../Unauthenticated/Unauthenticated";

const CSVUpload = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <h1 className="flex justify-center font-title font-bold  mt-10 mb-5">
        Sistema de Carga de Datos
      </h1>
      {isAuthenticated ? <Authenticated /> : <Unauthenticated />}
    </div>
  );
};

export default CSVUpload;
