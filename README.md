# Swagger 3.0.0 validator

Components:

- File validator
- Request validator

Swagger 3 spec: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md

# Primary focus should be on req/res validation

- [] Identify which parts of the doc are our immediate focus
- [x] With a given request, find the associated path in the swagger doc
- [] Validate the request against the schema in the asssociated path
- [] Retrieve a `$ref` schema from swagger doc
- [] How do we validate a response?
- [] Validate a response
- [] identify different objects within spec to validate
- [] Validate `$ref`'s in the File validator
