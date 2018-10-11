# Swagger 3.0.0 validator

Components:

- File validator
- Request validator

# Primary focus should be on req/res validation

- [] Identify which parts of the doc are our immediate focus
- [] Validate a given request against the schema
- [x] With a given request, find the associated path in the swagger doc
- [] Validate the request against the schema in the asssociated path
- [] Retrieve a `$ref` schema from swagger doc
- [] Validate a response
- [] identify different objects within spec to validate
- [] Validate `$ref`'s in the File validator
