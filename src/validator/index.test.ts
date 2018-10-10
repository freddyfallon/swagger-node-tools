import validator from "./"
describe("Validator", () => {
  test("calls next ", () => {

    const req = {}
    const res = {}
    const next = jest.fn()
    expect(next)
      .not
      .toHaveBeenCalled()
    validator('string')(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})