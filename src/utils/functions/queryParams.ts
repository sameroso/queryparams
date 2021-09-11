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
     *  const { addParamList } = queryParamsFactory('?key1=value1')
     *  const urlWithAddedParamList = addParamList([{ key:"key2", value:"value2"},{ key:"key3", value:"value3"}])
     *
     *  console.log(urlWithAddedParamList) => "key1=value1&key2=value2&key3=value3"
     *
     */

    addParamList(paramsList: GenericParams[]) {
      paramsList.forEach(({ key, value }) => {
        urlSearchParams.append(key as string, value);
      });
      return urlSearchParams.toString();
    },

    /**
     *
     * @param key - Array of params wanted to remove
     * @returns query param Url string
     * @example
     *  const { removeParamList } = queryParamsFactory('?key1=value1&key2=value2&key3=value3&key4=value4')
     *  const urlWithRemovedParamList = removeParamList(["key2", "key3"])
     *
     *  console.log(urlWithRemovedParamList) => "key1=value1&key4=value4"
     *
     */

    removeParamList(paramsList: (keyof T)[]) {
      paramsList.forEach((key) => {
        urlSearchParams.delete(key as string);
      });
      return urlSearchParams.toString();
    },

    /**
     *
     * @param key - param wanted to remove
     * @returns query param Url string
     * @example
     *  const { removeParam } = queryParamsFactory('?key1=value1&key2=value2&key3=value3&key4=value4')
     *  const urlWithRemovedParam = removeParam("key2")
     *
     *  console.log(urlWithRemovedParam) => "key1=value1&key3=value3&key4=value4"
     *
     */

    removeParam(key: keyof T) {
      urlSearchParams.delete(key as string);
      return urlSearchParams.toString();
    },

    /**
     * @description
     * if param exists it replaces the param, if it does not exists it adds param
     *
     * @param key - param key wanted to to add or replace
     * @param value - param value wanted to add or
     * @returns query param Url string
     * @example
     *  const { addOrReplaceParam } = queryParamsFactory('?key1=value1&key2=value2')
     *  const urlWithaddedAndReplaceParam = removeParam([{key:"key2", value:"replacedValue2"},{key:"key3", value:"addedValue3"}])
     *
     *  console.log(urlWithRemovedParam) => "key1=value1&key2=replacedValue2&key3=addedValue3"
     */

    addOrReplaceParam({ key, value }: SpecificParams<T>) {
      urlSearchParams.set(key as string, value);
      return urlSearchParams.toString();
    },

      /**
     * @description
     * if param exists it replaces the param, if it does not exists it adds param
     *
     * @param key - param key wanted to to add or replace
     * @param value - param value wanted to add or
     * @returns query param Url string
     * @example
     *  const { addOrReplaceParam } = queryParamsFactory('?key1=value1&key2=value2')
     *  const urlWithaddedAndReplaceParam = removeParam([{key:"key2", value:"replacedValue2"},{key:"key3", value:"addedValue3"}])
     *
     *  console.log(urlWithRemovedParam) => "key1=value1&key2=replacedValue2&key3=addedValue3"
     */

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
