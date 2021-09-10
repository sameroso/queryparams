interface SpecificParams<T extends Record<string, string>> {
  key: keyof T;
  value: string;
}

interface GenericParams {
  key: string;
  value: string;
}

export function queryParamsFactory<T extends Record<string, string>>(
  queryUrl: string
) {
  const urlSearchParams = new URLSearchParams(queryUrl);
  return {
    urlSearchParams,
    /**
     *
     * @param key - the key of the param to add
     * @param value - the value the param to add
     * @returns query param Url string
     * @example
     *  const { addParam } = queryParamsFactory('?key1=value1')
     *  const urlWithAddedParam = addParam({ key:"key2", value:"value2"})
     *
     *  console.log(urlWithAddedParam) => "key1=value1&key2=value2"
     *
     */

    addParam({ key, value }: GenericParams) {
      urlSearchParams.append(key, value);
      return urlSearchParams.toString();
    },

    /**
     *
     * @param key - the key of the param to add
     * @param value - the value the param to add
     * @returns query param Url string
     * @example
     *  const { addParam } = queryParamsFactory('?key1=value1')
     *  const urlWithAddedParam = addParamList([{ key:"key2", value:"value2"},{ key:"key3", value:"value3"}])
     *
     *  console.log(urlWithAddedParam) => "key1=value1&key2=value2&key3=value3"
     *
     */

    addParamList(paramsList: GenericParams[]) {
      paramsList.forEach(({ key, value }) => {
        urlSearchParams.append(key as string, value);
      });
      return urlSearchParams.toString();
    },

    removeParamList(paramsList: (keyof T)[]) {
      paramsList.forEach((key) => {
        urlSearchParams.delete(key as string);
      });
      return urlSearchParams.toString();
    },

    removeParam(key: keyof T) {
      urlSearchParams.delete(key as string);
      return urlSearchParams.toString();
    },

    addOrReplaceParam({ key, value }: SpecificParams<T>) {
      urlSearchParams.set(key as string, value);
      return urlSearchParams.toString();
    },

    addOrReplaceParamList(paramsList: SpecificParams<T>[]) {
      paramsList.forEach(({ key, value }) => {
        urlSearchParams.set(key as string, value);
      });
      return urlSearchParams.toString();
    },

    getParam(key: keyof T) {
      return urlSearchParams.get(key as string);
    },

    getParamList(keys: Array<keyof T>) {
      return keys.reduce((acc, key) => {
        return { ...acc, [key]: urlSearchParams.get(key as string) };
      }, {});
    },

    getAllParams() {
      const entries = urlSearchParams.entries();
      let entriesValues = entries.next();
      let params: Record<string, string> = {
        [entriesValues.value[0]]: entriesValues.value[1],
      };
      while (!entriesValues.done) {
        params[entriesValues.value[0]] = entriesValues.value[1];
        entriesValues = entries.next();
      }
      return params as Record<keyof T, string>;
    },

    getQueryParamUrl() {
      return urlSearchParams.toString();
    },

    compose(...fns: Array<Function>) {
      fns.forEach((fn) => {
        fn();
      });
      return urlSearchParams.toString();
    },
  };
}
