import React from "react";
import { uploadCSVFile } from "../../services/upload";

const Authenticated = () => {
  const [status, setStatus] = React.useState("idle");
  const [selectedFile, setSelectedFile] = React.useState("");
  const [results, setResults] = React.useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setStatus("loading");
      const response = await uploadCSVFile(formData);

      setStatus("success");
      setResults(response);
    } catch (error) {
      console.error("Error to upload the file", error);
      setStatus("error");
    }
  }

  function handleClick() {
    setStatus("idle");
  }

  const isLoading = status === "loading";

  return (
    <div>
      <div>
        {status === "idle" && (
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
        )}
        {status === "success" && results && (
          <div>
            <div>
              <button onClick={handleClick}>New File</button>
            </div>
            <div>
              <div>
                <div>
                  {results.data.success.flat().length} records uploades
                  successfully
                </div>
                {/* <ul>
                  {results.data.success.flat().map((item, index) => (
                    <li key={index}>
                      {item.id}, {item.name}, {item.email}, {item.age}
                    </li>
                  ))}
                </ul> */}
              </div>
              <div>
                <div>
                  {" "}
                  The ({results.data.error.flat().length}) records listed
                  encountered errors. Please rectify these issues and rety
                </div>
                <ul>
                  {results.data.error.flat().map((error, index) => (
                    <li key={index}>
                      Row {error.row}:{" "}
                      {Object.entries(error.details).map(([field, message]) => (
                        <div key={field}>
                          {field}: {message}
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {status === "error" && (
          <div>
            <p>Error uploading the file. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Authenticated;
