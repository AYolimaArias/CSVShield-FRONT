import { useAuth } from "../../contexts/authContext";
import Authenticated from "../Authenticated/Authenticated";
import Unauthenticated from "../Unauthenticated/Unauthenticated";

const CSVUpload = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <h1>Sistema de Carga de Datos</h1>
      {isAuthenticated ? <Authenticated /> : <Unauthenticated />}
    </div>
  );
};

export default CSVUpload;
