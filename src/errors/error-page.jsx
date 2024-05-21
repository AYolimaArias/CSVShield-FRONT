import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="mt-60 flex justify-center items-center">
      <div className="flex justify-center ml-32">
        <p className="mt-6 mr-8 font-bold text-5xl flex justify-center">
          <i className="mb-8">{error.statusText || error.message}</i>
        </p>
      </div>
      <div>
        <h1 className=" font-medium text-2xl">Oops!</h1>
        <p className=" font-medium text-1xl">
          Sorry, an unexpected error has occurred.
        </p>
      </div>
    </div>
  );
}
