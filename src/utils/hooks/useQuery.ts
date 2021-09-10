import { useLocation } from "react-router-dom";
import { queryParamsFactory } from "../functions/queryParams";

export function useQuery<T extends Record<string, string>>() {
  return queryParamsFactory(useLocation().search);
}
