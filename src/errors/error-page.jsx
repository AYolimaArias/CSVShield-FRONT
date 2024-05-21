import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex justify-center">
      <h1 className="mt-10">Oops!</h1>
      <p className="mt-6">Sorry, an unexpected error has occurred.</p>
      <p className="mt-6">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
