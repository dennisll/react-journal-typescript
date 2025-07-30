import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useState } from "react";

interface ErrorResponse {
  error?: FetchBaseQueryError;
  errorDto?: string;
}

export const useHandledError = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handledError = (errorResponse: ErrorResponse) => {
    if (errorResponse.errorDto) {
      setErrorMessage(
        `${errorResponse.errorDto}, Enter the form data again and submit it`
      );
    } else if (typeof errorResponse.error!.status === "number") {
      const { data } = errorResponse.error!;

      console.log(data);

      if (typeof data === "object" && data !== null) {
        const keys = Object.keys(data);

        keys.map((key) => {
          if (key === "error") {
            if (data[key as keyof typeof data] === 'Account not active') {
              setErrorMessage(`${data[key as keyof typeof data]}`);
            } else {
              setErrorMessage(
                `${
                  data[key as keyof typeof data]
                }, Enter the form data again and submit it`
              );
            }
          }
        });
      }
    } else if (typeof errorResponse.error!.status === "string") {
      switch (errorResponse.error?.status) {
        case "FETCH_ERROR":
          setErrorMessage(errorResponse.error!.error);
          break;
        case "PARSING_ERROR":
          setErrorMessage(errorResponse.error!.error);
          break;
        case "TIMEOUT_ERROR":
          setErrorMessage(errorResponse.error!.error);
          break;

        default:
          setErrorMessage(
            `${
              errorResponse.error!.error
            }, Enter the form data again and submit it`
          );
          break;
      }
    }
  };
  return { errorMessage, handledError };
};
