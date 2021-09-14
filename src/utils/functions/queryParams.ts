export function urlSearchParamsFactory<
  T extends Record<string, string> = Record<string, string>
>(queryUrl: string) {
  const urlSearchParams = new URLSearchParams(queryUrl);
  return {
    urlSearchParams,

    /**
     * @description                       [add single param to url search params]
     *
     * @param   {string}        key       [the key of the param to add]
     * @param   {string}        value     [the value the param to add]
     *
     * @return  {string}                  [Url search params string modified]
     *
     * @example
     *  const { addParam } = urlSearchParamsFactory('?key1=value1')
     *  const urlSearchParamsWithAddedParam = addParam({ key:"key2", value:"value2"})
     *
     *  console.log(urlSearchParamsWithAddedParam) => "key1=value1&key2=value2"
     *
     */

    addParam({ key, value }: { key: string; value: string }): string {
      urlSearchParams.append(key, value);
      return urlSearchParams.toString();
    },

    /**
     * @description                          [add param list to url search params]
     *
     * @param   {string}         key         [the key of the param to add]
     * @param   {string}         value       [the value the param to add]
     *
     * @return  {string}                     [Url search params string modified]
     *
     * @example
     *  const { addParamList } = urlSearchParamsFactory('?key1=value1')
     *  const urlSearchParamsWithAddedParamList = addParamList([{ key:"key2", value:"value2"},{ key:"key3", value:"value3"}])
     *
     *  console.log(urlSearchParamsWithAddedParamList) => "key1=value1&key2=value2&key3=value3"
     */

    addParamList(paramsList: { key: string; value: string }[]): string {
      paramsList.forEach(({ key, value }) => {
        urlSearchParams.append(key as string, value);
      });
      return urlSearchParams.toString();
    },

    /**
     * @description           [remove specific param]
     *
     * @param   {string}  key  [param key wanted to remove]
     *
     * @return  {string}      [Url search params string modified]
     *
     * @example
     *  const { removeParam } = urlSearchParamsFactory('?key1=value1&key2=value2&key3=value3&key4=value4')
     *  const urlSearchParamsWithRemovedParam = removeParam("key2")
     *
     *  console.log(urlSearchParamsWithRemovedParam) => "key1=value1&key3=value3&key4=value4"
     *
     */

    removeParam(key: keyof T): string {
      urlSearchParams.delete(key as string);
      return urlSearchParams.toString();
    },

    /**
     * @description                               [remove params list specified by an array of strings representing the key]
     *
     * @param   { key:string[] }    paramsList        [array of strings representing the keys wanted to remove]
     *
     * @return  {string}                        [Url search params string modified]
     *
     * @example
     *  const { removeParamList } = urlSearchParamsFactory('?key1=value1&key2=value2&key3=value3&key4=value4')
     *  const urlSearchParamsWithRemovedParamList = removeParamList(["key2", "key3"])
     *
     *  console.log(urlSearchParamsWithRemovedParamList) => "key1=value1&key4=value4"
     */

    removeParamList(paramsList: (keyof T)[]): string {
      paramsList.forEach((key) => {
        urlSearchParams.delete(key as string);
      });
      return urlSearchParams.toString();
    },

    /**
     * @description                                  [if param exists it replaces the param, if it does not exists it adds param]
     *
     * @param   {string}                      key    [param key wanted to to add or replace]
     * @param   {string}                      value  [param value wanted to to add or replace]
     *
     * @return  {string}                             [Url search params string modified]
     *
     * @example
     *  const { addOrReplaceParam } = urlSearchParamsFactory('?key1=value1&key2=value2')
     *  const urlSearchParamsWithAddedOrReplacedParam = addOrReplaceParam({key:"key2", value:"replacedValue2"})
     *
     *  console.log(urlSearchParamsWithAddedOrReplacedParam) => "key1=value1&key2=replacedValue2"
     */

    addOrReplaceParam({ key, value }: { key: keyof T; value: string }): string {
      urlSearchParams.set(key as string, value);
      return urlSearchParams.toString();
    },

    /**
     * @description                                                [if param exists it replaces the param, if it does not exists it adds param]
     *
     * @param   {{ key:string; value:string }[]}       paramsList  [paramsList description]
     *
     * @return  {string}                                           [Url search params string modified]
     *
     * @example
     *  const { addOrReplaceParamList } = urlSearchParamsFactory('?key1=value1&key2=value2')
     *  const urlSearchParamWithAddedAndReplacedParam = addOrReplaceParamList([{key:"key2", value:"replacedValue2"},{key:"key3", value:"addedValue3"}])
     *
     *  console.log(urlSearchParamWithAddedAndReplacedParam) => "key1=value1&key2=replacedValue2&key3=addedValue3"
     */

    addOrReplaceParamList(
      paramsList: { key: keyof T; value: string }[]
    ): string {
      paramsList.forEach(({ key, value }) => {
        urlSearchParams.set(key as string, value);
      });
      return urlSearchParams.toString();
    },

    /**
     * @description            [get specific param on url search params]
     *
     * @param   {string}  key  [key of value wanted to get]
     *
     * @return  {string}       [Url search params string modified]
     *
     * @example
     *  const { getParam } = urlSearchParamsFactory('?key1=value1&key2=value2')
     *  const param = getParam("key2")
     *
     *  console.log(param) => "value2"
     *
     */

    getParam(key: keyof T): string | null {
      return urlSearchParams.get(key as string);
    },

    /**
     * @description                              [get param list on url search params]
     *
     * @param   {string[]}            keys       [Array of values wanted to get params]
     *
     * @return  {string}                          [object containing param values]
     * @example
     *  const { getParamList } = urlSearchParamsFactory('?key1=value1&key2=value2&key3=value3')
     *  const params = getParamList(["key2","key3"])
     *
     *  console.log(params) => { key2:"value2", key3:"value3"};
     *
     */

    getParamList(keys: Array<keyof T>): Record<keyof T, string | null> {
      return keys.reduce((acc, key) => {
        return { ...acc, [key]: urlSearchParams.get(key as string) };
      }, {}) as Record<keyof T, string | null>;
    },

    /**
     * @description                                                   [get all params on url search params]
     *
     *
     * @return  {Record<string, string>}                              [object containing all param values]
     *
     *  @example
     *  const { getAllParams } = urlSearchParamsFactory('?key1=value1&key2=value2&key3=value3')
     *  const params = getAllParams()
     *
     *  console.log(params) => { key1:"value1", key2:"value2", key3:"value3" };
     */

    getAllParams(): Record<keyof T, string> | Record<string, never> {
      const entries = urlSearchParams.entries();
      let entriesValues = entries.next();

      let params: Record<string, string> = !entriesValues.done
        ? {
            [entriesValues?.value?.[0]]: entriesValues.value?.[1],
          }
        : {};

      while (!entriesValues.done && entriesValues.value) {
        params[entriesValues?.value?.[0]] = entriesValues?.value?.[1];
        entriesValues = entries.next();
      }

      return params as Record<keyof T, string> | Record<string, never>;
    },

    /**
     * @description        [get Url search params]
     *
     * @return  {string}  [url search params]
     *
     * @example
     *  const { getQueryParamUrl } = urlSearchParamsFactory('?key1=value1&key2=value2&key3=value3')
     *  const queryParamUrl = getQueryParamUrl()
     *
     *  console.log(queryParamUrl) => "key1=value1&key2=value2&key3=value3";
     */

    getUrlSearchParams(): string {
      return urlSearchParams.toString();
    },

    /**
     * @description                          [compose can be used to execute more than one function and returns the result url search params modified]
     *
     * @param   {Array<Function>}  fns       [functions selected to compose and modify url search params]
     *
     * @return  {string}            [Url search params string modified]
     *
     * @example
     *  const { compose, addOrReplaceParamList, removeParamList } = urlSearchParamsFactory('?key1=value1&key2=value2&key3=value3&key5=value5')
     *  const modifiedUrlSearchParams = compose(
     *  () => addOrReplaceParamList([{key:"key1", value:"replacedValue1"},{key:"key4", value:"value4"}]),
     *  () => removeParamList(["key2", "key5"])
     * )
     *
     *  console.log(modifiedUrlSearchParams) => "?key1=replacedValue1&key3=value3&key4=value4"
     */

    compose(...fns: Array<Function>): string {
      fns.forEach((fn) => {
        fn();
      });
      return urlSearchParams.toString();
    },
  };
}
