import React from "react";
import { uploadCSVFile } from "../../services/upload";

const Authenticated = () => {
  const [status, setStatus] = React.useState("idle");
  const [selectedFile, setSelectedFile] = React.useState("");
  const [results, setResults] = React.useState(null);
  const [errorRows, setErrorRows] = React.useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setStatus("loading");
      const response = await uploadCSVFile(formData);

      setStatus("success");
      setResults(response);
      if (response.data && response.data.error) {
        setErrorRows(
          response.data.error.flat().map((error) => ({
            row: error.row,
            data: error.details,
          }))
        );
      }
    } catch (error) {
      console.error(
        "Error to upload the file, Only Admin role can upload files",
        error
      );
      setStatus("error");
    }
  }

  function handleClick() {
    setStatus("idle");
  }

  function handleRetry(index) {
    setErrorRows(errorRows.filter((_, i) => i !== index));
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
                <div className="bg-green-500">
                  {results.data.success.flat().length} records uploades
                  successfully
                </div>
              </div>
              <div>
                <div>
                  {" "}
                  The ({errorRows.length}) records listed encountered errors.
                  Please rectify these issues and rety
                </div>
                <div>
                  {errorRows.map((error, index) => (
                    <div key={index} style={{ margin: "10px 0" }}>
                      <div>Row {error.row}:</div>
                      {Object.entries(error.data).map(([field, message]) => (
                        <div key={field}>
                          <label htmlFor={`${field}-${index}`}>{field}</label>
                          <input
                            id={`${field}-${index}`}
                            type="text"
                            name={field}
                            defaultValue={message}
                            // onChange={(e) => {
                            //   const updatedErrorRows = [...errorRows];
                            //   updatedErrorRows[index].data[field].value =
                            //     e.target.value;
                            //   setErrorRows(updatedErrorRows);
                            // }}
                          />
                          <div style={{ color: "red" }}>{message}</div>
                        </div>
                      ))}
                      <button onClick={() => handleRetry(index)}>Retry</button>
                    </div>
                  ))}
                </div>
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
