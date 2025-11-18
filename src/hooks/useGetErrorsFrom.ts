import { useState } from "react";

export function useGetErrors(object: { [key: string]: number | string }) {
  const [errors, setErrors] = useState<{ [key: string]: number | string }>({});
  console.log(object);
  return {
    errors,
    setErrors,
  };
}
