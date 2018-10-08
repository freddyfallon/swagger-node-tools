import validator from "./"

describe("Validator", () => {
  test("calls next", () => {
    const req = {}
    const res = {}
    const next = jest.fn()
    expect(next).not.toHaveBeenCalled()
    validator(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
