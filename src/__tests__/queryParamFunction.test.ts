import { urlSearchParamsFactory } from "../utils/functions/queryParams";

describe("Testing queryParamsFactory functionalities", () => {
  test(`add param`, () => {
    const { addParam } = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
    }>("?testKey1=testValue1&testKey2=testValue2");

    const urlSearchParamsWithAddedParam = addParam({
      key: "testKey3",
      value: "addedValue3",
    });

    expect(urlSearchParamsWithAddedParam).toBe(
      "testKey1=testValue1&testKey2=testValue2&testKey3=addedValue3"
    );
  });

  test(`add param List`, () => {
    const { addParamList } = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
    }>("?testKey1=testValue1&testKey2=testValue2");

    const urlSearchParamsWithAddedParamList = addParamList([
      {
        key: "testKey3",
        value: "addedValue3",
      },
      {
        key: "testKey4",
        value: "addedValue4",
      },
    ]);

    expect(urlSearchParamsWithAddedParamList).toBe(
      "testKey1=testValue1&testKey2=testValue2&testKey3=addedValue3&testKey4=addedValue4"
    );
  });

  test(`remove param`, () => {
    const { removeParam } = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
    }>("?testKey1=testValue1&testKey2=testValue2&testKey3=testValue3");

    const urlSearchParamsWithRemovedParams = removeParam("testKey2");

    expect(urlSearchParamsWithRemovedParams).toBe(
      "testKey1=testValue1&testKey3=testValue3"
    );
  });

  test(`remove param List`, () => {
    const { removeParamList } = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
      testKey4: string;
    }>(
      "?testKey1=testValue1&testKey2=testValue2&testKey3=testValue3&testKey4=testValue4"
    );

    const urlSearchParamsWithRemovedParamList = removeParamList([
      "testKey2",
      "testKey3",
    ]);

    expect(urlSearchParamsWithRemovedParamList).toBe(
      "testKey1=testValue1&testKey4=testValue4"
    );
  });

  test("addOrReplaceParam adds param when there is no param in the url", () => {
    const { addOrReplaceParam } = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
    }>("?testKey1=testValue1");

    const urlSearchParamsWithParamAdded = addOrReplaceParam({
      key: "testKey2",
      value: "testValue2&",
    });

    expect(urlSearchParamsWithParamAdded).toBe(
      "testKey1=testValue1&testKey2=testValue2%26"
    );
  });

  test("addOrReplaceParam replace param when there is an existing param in the Url", () => {
    const { addOrReplaceParam } = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
    }>("?testKey1=testValue1&testKey2=testValue2");

    const urlSearchParamsWithReplacedParam = addOrReplaceParam({
      key: "testKey1",
      value: "replacedValue1+",
    });

    expect(urlSearchParamsWithReplacedParam).toBe(
      "testKey1=replacedValue1%2B&testKey2=testValue2"
    );
  });

  test("add or replace param list when there is existing params in the Url", () => {
    const { addOrReplaceParamList } = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
    }>("?testKey1=testValue1&testKey2=testValue2");

    const urlSearchParamsWithReplacedParamList = addOrReplaceParamList([
      {
        key: "testKey1",
        value: "replacedValue1",
      },
      {
        key: "testKey2",
        value: "replacedValue2",
      },
    ]);

    expect(urlSearchParamsWithReplacedParamList).toBe(
      "testKey1=replacedValue1&testKey2=replacedValue2"
    );
  });

  test(`add or replace param list when there is existing 
  params in the Url and add more params when it does not exist`, () => {
    const queryParamUrlWithReplacedParamList = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3?: string;
      testKey4?: string;
    }>("?testKey1=testValue1&testKey2=testValue2").addOrReplaceParamList([
      {
        key: "testKey1",
        value: "replacedValue1",
      },
      {
        key: "testKey2",
        value: "replacedValue2",
      },
      {
        key: "testKey3",
        value: "addedValue3",
      },
      {
        key: "testKey4",
        value: "addedValue4",
      },
    ]);

    expect(queryParamUrlWithReplacedParamList).toBe(
      "testKey1=replacedValue1&testKey2=replacedValue2&testKey3=addedValue3&testKey4=addedValue4"
    );
  });

  test(`get param`, () => {
    const param = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
    }>(
      "?testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3"
    ).getParam("testKey2");

    expect(param).toBe("testValue2&");
  });

  test(`get param list`, () => {
    const paramList = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
    }>(
      "?testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3"
    ).getParamList(["testKey2", "testKey3"]);

    expect(paramList).toEqual({
      testKey2: "testValue2&",
      testKey3: "testValue3",
    });
  });

  test(`get param list with empty string returns null on param keys`, () => {
    const paramList = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
    }>("").getParamList(["testKey2", "testKey3"]);

    expect(paramList).toEqual({
      testKey2: null,
      testKey3: null,
    });
  });

  test(`get all params`, () => {
    const paramList = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
    }>(
      "?testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3"
    ).getAllParams();

    console.log(paramList.testKey1);

    expect(paramList).toEqual({
      testKey1: "testValue1",
      testKey2: "testValue2&",
      testKey3: "testValue3",
    });
  });

  test(`get all params with empty string return empty object`, () => {
    const paramList = urlSearchParamsFactory("").getAllParams();

    expect(paramList).toEqual({});
  });

  test(`get Query param Url`, () => {
    const queryParamsUrl = urlSearchParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
    }>(
      "?testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3"
    ).getUrlSearchParams();

    expect(queryParamsUrl).toEqual(
      "testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3"
    );
  });

  test(`compose`, () => {
    const { compose, addOrReplaceParamList, removeParam, addParamList } =
      urlSearchParamsFactory<{
        testKey1: string;
        testKey2: string;
        testKey3: string;
      }>("?testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3");
    const newQueryParamUrl = compose(
      () =>
        addOrReplaceParamList([{ key: "testKey1", value: "replacedValue1" }]),
      () => removeParam("testKey3"),
      () => addParamList([{ key: "testValue4", value: "addedValue4" }])
    );
    expect(newQueryParamUrl).toEqual(
      "testKey1=replacedValue1&testKey2=testValue2%26&testValue4=addedValue4"
    );
  });
});
