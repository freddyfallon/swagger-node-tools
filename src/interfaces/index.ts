export interface OpenAPI {
  openapi: string // REQUIRED. This string MUST be the semantic version number of the OpenAPI Specification version that the OpenAPI document uses. The openapi field SHOULD be used by tooling specifications and clients to interpret the OpenAPI document. This is not related to the API info.version string.
  info: Info // REQUIRED. Provides metadata about the API. The metadata MAY be used by tooling as required.
  // servers	[Server Object]	An array of Server Objects, which provide connectivity information to a target server. If the servers property is not provided, or is an empty array, the default value would be a Server Object with a url value of /.
  paths: Paths // REQUIRED. The available paths and operations for the API.
  components?: Components // Object	An element to hold various schemas for the specification.
  // security	[Security Requirement Object]	A declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition.
  // tags	[Tag Object]	A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the Operation Object must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
  // externalDocs	External Documentation Object	Additional external documentation.
}

export interface Info {
  title: string // REQUIRED. The title of the application.
  // description: string	//A short description of the application. CommonMark syntax MAY be used for rich text representation.
  // termsOfService: string	//A URL to the Terms of Service for the API. MUST be in the format of a URL.
  // contact: Contact //Object	The contact information for the exposed API.
  // license: License //Object	The license information for the exposed API.
  version: string //	REQUIRED. The version of the OpenAPI document (which is distinct from the OpenAPI Specification version or the API implementation version).
}

export interface Paths {
  [path: string]: PathItem // contains pathItems
}

type Bar = { [key in HttpVerb]: string }

interface ServerVariableObject {
  enum?: [string]
  default: string
  description?: string
}

export interface PathItem {
  $ref?: string
  summary?: string
  description?: string
  get?: Operation
  put?: Operation
  post?: Operation
  delete?: Operation
  options?: Operation
  head?: Operation
  patch?: Operation
  trace?: Operation
  servers?: [Server]
  parameters?: [Parameter, Reference]
}

export interface Operation {
  tags?: [string]
  summary?: string
}
export interface Parameter {
  name: string
  in: ParameterLocation
  description?: string
  externalDocs?: string
  operationId?: string
  parameters?: [Parameter, Reference]
  requestBody?: Parameter | Reference
  responses: Responses
  // callbacks?: Map<string, Callback | Reference>
  deprecated?: boolean
  // security?: [SecurityRequirement]
  servers?: [Server]
}

interface Responses {
  default: Response | Reference
  [statusCode: number]: Response | Reference
}

interface Response {
  description: string
  headers?: Map<string, Header | Reference>
  content?: Map<string, MediaType>
  links?: Map<string, Link | Reference>
}

interface Header {}

export interface Parameter {
  name: string
  in: string
  description?: string
  required: boolean // if the parameter location is path it is required, otherwise it isn't: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#parameterObject
  deprecated?: boolean
  allowEmptyValue?: boolean
}

export interface Reference {
  $ref: string
}

interface Server {
  url: string
  description?: string
  variable?: Map<string, ServerVariableObject>
}

interface ServerVariableObject {
  enum?: [string]
  default: string
  description?: string
}

interface Components {
  schemas?: Map<string, Schema | Reference>
  responses?: Map<string, Response | Reference>
  parameters?: Map<string, Parameter | Reference>
  // examples?:	Map<string, Example | Reference>
  // requestBodies?:	Map<string, RequestBody | Reference>
  // securitySchemes?:	Map<string, SecurityScheme | Reference>
  links?: Map<string, Link | Reference>
  // callbacks?:	Map<string, Callback | Reference>
}

interface Link {}

export interface Schema {
  [key: string]: object
}

export interface RequestBody {
  description?: string
  content: Map<string, MediaType> // The content of the request body. The key is a media type or media type range and the value describes it. For requests that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*
  required?: boolean
}

interface MediaType {
  schema?: Schema | Reference
  example?: any
  examples?: Map<string, Example | Reference>
  encoding?: Map<string, Encoding>
}

interface Example {
  summary?: string
  description?: string
  value?: any
  externalValue?: string
}

interface Encoding {
  contentType?: string
  headers?: Map<string, Header | Reference>
  style?: string
  explode?: boolean
  allowReserved?: boolean
}

type HttpVerb =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace'

type ParameterLocation = 'query' | 'header' | 'path' | 'cookie'

// interface Callback {
//   [expression: string]: PathItem
// }

// interface SecurityRequirement {
//   [name: string]: [string]
// }

/*
Each name MUST correspond to a security scheme which is declared in the Security Schemes under the Components Object.
If the security scheme is of type "oauth2" or "openIdConnect", then the value is a list of scope names required for the execution.
For other security scheme types, the array MUST be empty.
*/
