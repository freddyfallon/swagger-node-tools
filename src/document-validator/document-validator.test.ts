import requestValidator from './document-validator'
const validSwaggerDoc = {
    info: {
        title: 'sample-title',
        version: '3.0.0'
    },
    openapi: '3',
    paths: {}
}

describe('documentValidator', () => {
    test('exports a function', () => {
        expect(requestValidator(validSwaggerDoc)).toBe(true)
    })
})