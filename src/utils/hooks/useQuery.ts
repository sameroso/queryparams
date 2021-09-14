import { useLocation } from "react-router-dom";
import { urlSearchParamsFactory } from "../functions/queryParams";

export function useQuery<T extends Record<string, string>>() {
  return urlSearchParamsFactory(useLocation().search);
}
