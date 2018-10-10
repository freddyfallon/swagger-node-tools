jest.mock("./paths-validator");
import requestValidator from "./document-validator";
import pathsValidator from "./paths-validator";

const validSwaggerDoc = {
  info: {
    title: "sample-title",
    version: "3.0.0"
  },
  openapi: "3",
  paths: {}
};

describe("documentValidator", () => {
  test("calls pathsValidator", () => {
    expect(pathsValidator).not.toBeCalled();
    requestValidator(validSwaggerDoc);
    expect(pathsValidator).toBeCalled();
  });
});
