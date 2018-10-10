import requestValidator from "./request-validator"

describe("requestValidator", () => {
  test("calls next", () => {
    const req = {}
    const res = {}
    const next = jest.fn()
    expect(next).not.toHaveBeenCalled()
    requestValidator({})(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
