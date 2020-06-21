export const missingStateValidation = (
  functionToBeTested: Function,
  state: any
) => {
  test("returns an error if the state doesn't contain 'columns'", () => {
    expect(() => {
      functionToBeTested({
        ...state,
        columns: undefined
      });
    }).toThrow();
  });

  test("returns an error if the state doesn't contain 'rows'", () => {
    expect(() => {
      functionToBeTested({
        ...state,
        rows: undefined
      });
    }).toThrow();
  });
};

export const minimumColumnsAndRowsValues = (
  functionToBeTested: Function,
  state: any
) => {
  test("returns an error if 'columns' is less than 10", () => {
    expect(() => {
      functionToBeTested({
        ...state,
        columns: 9,
        rows: 10
      });
    }).toThrow();
  });

  test("returns an error if 'rows' is less than 10", () => {
    expect(() => {
      functionToBeTested({
        ...state,
        columns: 10,
        rows: 9
      });
    }).toThrow();
  });

  test("does not return an error if 'columns' and 'rows' are 10", () => {
    expect(() => {
      functionToBeTested({
        ...state,
        columns: 10,
        rows: 10
      });
    }).not.toThrow();
  });

  test("does not return an error if 'columns' and 'rows' are more than 10", () => {
    expect(() => {
      functionToBeTested({
        ...state,
        columns: 12,
        rows: 12
      });
    }).not.toThrow();
  });
};
