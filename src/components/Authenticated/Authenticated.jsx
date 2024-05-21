import React from "react";
import { uploadCSVFile } from "../../services/upload";
import Button from "../Button";

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
      <div className="flex justify-center">
        {status === "idle" && (
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <p className="flex justify-center font-title font-medium mb-5  border-primary-500 rounded-md bg-slate-300 pr-0 pl-0">
                  Selecciona un archivo de carga
                </p>
              </div>
              <div className="flex justify-center mt-16 ml-14">
                <input
                  id="file"
                  type="file"
                  name="file"
                  accept=".csv"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  required
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="secondary" type="submit" disabled={isLoading}>
                {" "}
                {isLoading ? "Loading..." : "Upload File"}
              </Button>
            </div>
          </form>
        )}
        {status === "success" && results && (
          <div className="flex flex-col">
            <div>
              <div className="flex mt-10  mb-10">
                <div className="mr-3">
                  <Button className="pt-0 pb-1" onClick={handleClick}>
                    New File
                  </Button>
                </div>
                <div>
                  <div className="bg-green-300 pr-4 pl-4 ml-10  border border-primary-500 rounded-md">
                    {results.data.success.flat().length} records uploades
                    successfully
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-8">
                  {" "}
                  The ({errorRows.length}) records listed encountered errors.
                  Please rectify these issues and retry:
                </div>

                <div className="flex flex-col gap-3">
                  {errorRows.map((error, index) => (
                    <div key={index} style={{ margin: "10px 0" }}>
                      <div
                        className="flex
                      "
                      >
                        <div className="font-semibold">Row {error.row}:</div>

                        <Button
                          variant="secondary"
                          className="pt-0 pb-0 
                          ml-96"
                          onClick={() => handleRetry(index)}
                        >
                          Retry
                        </Button>
                      </div>

                      {Object.entries(error.data).map(([field, message]) => (
                        <div className="flex" key={field}>
                          <label className="" htmlFor={`${field}-${index}`}>
                            {field}
                          </label>
                          <input
                            id={`${field}-${index}`}
                            type="text"
                            name={field}
                            defaultValue={""}
                            placeholder="Rectify error in your document"
                            className="mt-1  border border-primary-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-700 sm:text-sm font-display ml-2 pl-2"
                            // onChange={(e) => {
                            //   const updatedErrorRows = [...errorRows];
                            //   updatedErrorRows[index].data[field].value =
                            //     e.target.value;
                            //   setErrorRows(updatedErrorRows);
                            // }}
                          />
                          <div className="font-display text-red-500 ml-2">
                            {message}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="flex justify-center ">
            <p className="bg-red-200 rounded-md pr-3 pl-3 mt-5">
              Error uploading the file. Only users with the Admin role can
              upload files.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Authenticated;
