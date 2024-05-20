import React from "react";
import { uploadCSVFile } from "../../services/upload";

const Authenticated = () => {
  const [status, setStatus] = React.useState("idle");
  // const [file, setFile] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState("");
  const [results, setResults] = React.useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setStatus("loading");
      const response = await uploadCSVFile(formData);
      setResults(response);

      setStatus("success");
      console.log(response.data);
    } catch (error) {
      console.error("Error to upload the file", error);
      setStatus("error");
    }
  }

  const isLoading = status === "loading";

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>Selecciona un archivo de carga</div>
            <input
              id="file"
              type="file"
              name="file"
              accept=".csv"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {" "}
            {isLoading ? "Loading..." : "Upload File"}
          </button>
        </form>
        {status === "success" && results && (
          <div>
            <h2>Resultados</h2>
            <div>
              <h3>Éxitos:</h3>
              <ul>
                {results.data.success.map((row, details) => (
                  <li key={row}>{details}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Errores:</h3>
              <ul>
                {results.data.error.map((details, row) => (
                  <li key={row}>{details}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Authenticated;
