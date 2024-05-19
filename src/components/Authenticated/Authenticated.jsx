import React from "react";
import { uploadCSVFile } from "../../services/upload";

const Authenticated = () => {
  const [status, setStatus] = React.useState("idle");
  const [file, setFile] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fileData = Object.fromEntries(formData.entries());

    try {
      setStatus("loading");
      const newFile = await uploadCSVFile(fileData);
      setFile([...file, newFile]);
      setStatus("success");
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
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {" "}
            {isLoading ? "Loading..." : "Upload File"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Authenticated;
