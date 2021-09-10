import { queryParamsFactory } from "../utils/functions/queryParams";

describe("Testing queryParamsFactory functionalities", () => {
  test("addOrReplaceParam adds param when there is no param in the url", () => {
    const queryParamUrlWithParamAdded = queryParamsFactory<{
      testKey1: string;
      testKey2: string;
    }>("?testKey1=testValue1").addOrReplaceParam({
      key: "testKey2",
      value: "testValue2&",
    });

    expect(queryParamUrlWithParamAdded).toBe(
      "testKey1=testValue1&testKey2=testValue2%26"
    );
  });

  test("addOrReplaceParam replace param when there is an existing param in the Url", () => {
    const queryParamUrlWithReplacedParam = queryParamsFactory<{
      testKey1: string;
      testKey2: string;
    }>("?testKey1=testValue1&testKey2=testValue2").addOrReplaceParam({
      key: "testKey1",
      value: "replacedValue1+",
    });

    expect(queryParamUrlWithReplacedParam).toBe(
      "testKey1=replacedValue1%2B&testKey2=testValue2"
    );
  });

  test("add or replace param list when there is existing params in the Url", () => {
    const queryParamUrlWithReplacedParam = queryParamsFactory<{
      testKey1: string;
      testKey2: string;
    }>("?testKey1=testValue1&testKey2=testValue2").addOrReplaceParamList([
      {
        key: "testKey1",
        value: "replacedValue1",
      },
      {
        key: "testKey2",
        value: "replacedValue2",
      },
    ]);

    expect(queryParamUrlWithReplacedParam).toBe(
      "testKey1=replacedValue1&testKey2=replacedValue2"
    );
  });

  test(`add or replace param list when there is existing 
  params in the Url and add more params when it does not exist`, () => {
    const queryParamUrlWithReplacedParam = queryParamsFactory<{
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

    expect(queryParamUrlWithReplacedParam).toBe(
      "testKey1=replacedValue1&testKey2=replacedValue2&testKey3=addedValue3&testKey4=addedValue4"
    );
  });

  test(`add param`, () => {
    const queryParamUrlWithReplacedParam = queryParamsFactory<{
      testKey1: string;
      testKey2: string;
    }>("?testKey1=testValue1&testKey2=testValue2").addParam({
      key: "testKey3",
      value: "addedValue3",
    });

    expect(queryParamUrlWithReplacedParam).toBe(
      "testKey1=testValue1&testKey2=testValue2&testKey3=addedValue3"
    );
  });

  test(`add param List`, () => {
    const queryParamUrlWithReplacedParam = queryParamsFactory<{
      testKey1: string;
      testKey2: string;
    }>("?testKey1=testValue1&testKey2=testValue2").addParamList([
      {
        key: "testKey3",
        value: "addedValue3",
      },
      {
        key: "testKey4",
        value: "addedValue4",
      },
    ]);

    expect(queryParamUrlWithReplacedParam).toBe(
      "testKey1=testValue1&testKey2=testValue2&testKey3=addedValue3&testKey4=addedValue4"
    );
  });

  test(`remove param`, () => {
    const queryParamUrlWithReplacedParam = queryParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
    }>(
      "?testKey1=testValue1&testKey2=testValue2&testKey3=testValue3"
    ).removeParam("testKey2");

    expect(queryParamUrlWithReplacedParam).toBe(
      "testKey1=testValue1&testKey3=testValue3"
    );
  });

  test(`remove param List`, () => {
    const queryParamUrlWithReplacedParam = queryParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
      testKey4: string;
    }>(
      "?testKey1=testValue1&testKey2=testValue2&testKey3=testValue3&testKey4=testValue4"
    ).removeParamList(["testKey2", "testKey3"]);

    expect(queryParamUrlWithReplacedParam).toBe(
      "testKey1=testValue1&testKey4=testValue4"
    );
  });

  test(`get param`, () => {
    const queryParamUrlWithReplacedParam = queryParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
    }>(
      "?testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3"
    ).getParam("testKey2");

    expect(queryParamUrlWithReplacedParam).toBe("testValue2&");
  });

  test(`get param list`, () => {
    const queryParamUrlWithReplacedParam = queryParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
    }>(
      "?testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3"
    ).getParamList(["testKey2", "testKey3"]);

    expect(queryParamUrlWithReplacedParam).toEqual({
      testKey2: "testValue2&",
      testKey3: "testValue3",
    });
  });

  test(`get all params`, () => {
    const queryParamUrlWithReplacedParam = queryParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
    }>(
      "?testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3"
    ).getAllParams();

    expect(queryParamUrlWithReplacedParam).toEqual({
      testKey1: "testValue1",
      testKey2: "testValue2&",
      testKey3: "testValue3",
    });
  });

  test(`get Query param Url`, () => {
    const queryParamUrlWithReplacedParam = queryParamsFactory<{
      testKey1: string;
      testKey2: string;
      testKey3: string;
    }>(
      "?testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3"
    ).getQueryParamUrl();

    expect(queryParamUrlWithReplacedParam).toEqual(
      "testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3"
    );
  });

  test(`compose`, () => {
    const { compose, addOrReplaceParamList, removeParam, addParamList } =
      queryParamsFactory<{
        testKey1: string;
        testKey2: string;
        testKey3: string;
      }>("?testKey1=testValue1&testKey2=testValue2%26&testKey3=testValue3");
    const queryParamUrlWithReplacedParam = compose(
      () =>
        addOrReplaceParamList([{ key: "testKey1", value: "replacedValue1" }]),
      () => removeParam("testKey3"),
      () => addParamList([{ key: "testValue4", value: "addedValue4" }])
    );
    expect(queryParamUrlWithReplacedParam).toEqual(
      "testKey1=replacedValue1&testKey2=testValue2%26&testValue4=addedValue4"
    );
  });
});
