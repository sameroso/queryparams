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
     * @returns query param Url string modified
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
     *@description
     - add param list to declared query params Url
     * @param key - the key of the param to add
     * @param value - the value the param to add
     * @returns query param Url string modified
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
     * @description
     * remove specific param
     * @param key - param wanted to remove
     * @returns query param Url string modified
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
     * remove params list specified by an array of strings representing the key
     * @param key - Array of params wanted to remove
     * @returns query param Url string modified
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
     * @description
     * if param exists it replaces the param, if it does not exists it adds param
     *
     * @param key - param key wanted to to add or replace
     * @param value - param value wanted to add or
     * @returns query param Url string modified
     * @example
     *  const { addOrReplaceParam } = queryParamsFactory('?key1=value1&key2=value2')
     *  const urlWithAddedAndReplaceParam = removeParam([{key:"key2", value:"replacedValue2"},{key:"key3", value:"addedValue3"}])
     *
     *  console.log(urlWithAddedAndReplaceParam) => "key1=value1&key2=replacedValue2&key3=addedValue3"
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
     * @returns query param Url string modified
     * @example
     *  const { addOrReplaceParamList } = queryParamsFactory('?key1=value1&key2=value2')
     *  const urlWithAddedAndReplaceParam = addOrReplaceParamList([{key:"key2", value:"replacedValue2"},{key:"key3", value:"addedValue3"}])
     *
     *  console.log(urlWithAddedAndReplaceParam) => "key1=value1&key2=replacedValue2&key3=addedValue3"
     */

    addOrReplaceParamList(paramsList: SpecificParams<T>[]) {
      paramsList.forEach(({ key, value }) => {
        urlSearchParams.set(key as string, value);
      });
      return urlSearchParams.toString();
    },

    /**
     * @description
     * get specific param on Url
     *
     * @param key - key of value wanted to get
     * @returns param value
     * @example
     *  const { getParam } = queryParamsFactory('?key1=value1&key2=value2')
     *  const param = getParam("key2")
     *
     *  console.log(param) => "value2"
     */

    getParam(key: keyof T) {
      return urlSearchParams.get(key as string);
    },

    /**
     * @description
     * get param list on Url
     *
     * @param keys - Array of values wanted to get params
     * @returns object containing param values
     * @example
     *  const { getParamList } = queryParamsFactory('?key1=value1&key2=value2&key3=value3')
     *  const params = getParamList(["key2","key3"])
     *
     *  console.log(params) => { key2:"value2", key3:"value3"};
     *
     */

    getParamList(keys: Array<keyof T>) {
      return keys.reduce((acc, key) => {
        return { ...acc, [key]: urlSearchParams.get(key as string) };
      }, {});
    },

    /**
     * @description
     * get all on Url
     *
     * @returns object containing all param values
     * @example
     *  const { getAllParams } = queryParamsFactory('?key1=value1&key2=value2&key3=value3')
     *  const params = getAllParams()
     *
     *  console.log(params) => { key1:"value1", key2:"value2", key3:"value3" };
     */

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

    /**
     * @description
     * get query param Url
     *
     * @returns object containing all param values
     * @example
     *  const { getQueryParamUrl } = queryParamsFactory('?key1=value1&key2=value2&key3=value3')
     *  const queryParamUrl = getQueryParamUrl()
     *
     *  console.log(queryParamUrl) => "key1=value1&key2=value2&key3=value3";
     */

    getQueryParamUrl() {
      return urlSearchParams.toString();
    },
    /**
     * @description
     * compose can be used to execute more than one function and returns the result
     *
     * @returns query param Url string modified
     * @example
     *  const { compose, addOrReplaceParamList, removeParamList } = queryParamsFactory('?key1=value1&key2=value2&key3=value3&key5=value5')
     *  const modifiedUrl = compose(
     *  () => addOrReplaceParamList([{key:"key1", value:"replacedValue1"},{key:"key4", value:"value4"}]),
     *  () => removeParamList(["key2", "key5"])
     * )
     *
     *  console.log(modifiedUrl) => "?key1=replacedValue1&key3=value3&key4=value4"
     */

    compose(...fns: Array<Function>) {
      fns.forEach((fn) => {
        fn();
      });
      return urlSearchParams.toString();
    },
  };
}
