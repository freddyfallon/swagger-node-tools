export interface Info {
  title: string	// REQUIRED. The title of the application.
  // description: string	//A short description of the application. CommonMark syntax MAY be used for rich text representation.
  // termsOfService: string	//A URL to the Terms of Service for the API. MUST be in the format of a URL.
  // contact: Contact //Object	The contact information for the exposed API.
  // license: License //Object	The license information for the exposed API.
  version: string//	REQUIRED. The version of the OpenAPI document (which is distinct from the OpenAPI Specification version or the API implementation version).
}

export interface Paths {
  [path: string]: PathItem // contains pathItems
}

export interface PathItem {
  //     $ref	string	Allows for an external definition of this path item.The referenced structure MUST be in the format of a Path Item Object.If there are conflicts between the referenced definition and this Path Item's definition, the behavior is undefined.
  // summary	string	An optional, string summary, intended to apply to all operations in this path.
  // description	string	An optional, string description, intended to apply to all operations in this path.CommonMark syntax MAY be used for rich text representation.
  // get	Operation Object	A definition of a GET operation on this path.
  // put	Operation Object	A definition of a PUT operation on this path.
  // post	Operation Object	A definition of a POST operation on this path.
  // delete Operation Object	A definition of a DELETE operation on this path.
  // options	Operation Object	A definition of a OPTIONS operation on this path.
  // head	Operation Object	A definition of a HEAD operation on this path.
  // patch	Operation Object	A definition of a PATCH operation on this path.
  // trace	Operation Object	A definition of a TRACE operation on this path.
  //     servers[Server Object]An alternative server array to service all operations in this path.
  //         parameters[Parameter Object | Reference Object]A list of parameters that are applicable for all the operations described under this path.These parameters can be overridden at the operation level, but cannot be removed there.The list MUST NOT include duplicated parameters.A unique parameter is defined by a combination of a name and location.The list can use the Reference Object to link to parameters that are defined at the OpenAPI Object's components/parameters.
}

export interface OpenAPI {
  openapi: string // REQUIRED. This string MUST be the semantic version number of the OpenAPI Specification version that the OpenAPI document uses. The openapi field SHOULD be used by tooling specifications and clients to interpret the OpenAPI document. This is not related to the API info.version string.
  info: Info // REQUIRED. Provides metadata about the API. The metadata MAY be used by tooling as required.
  // servers	[Server Object]	An array of Server Objects, which provide connectivity information to a target server. If the servers property is not provided, or is an empty array, the default value would be a Server Object with a url value of /.
  paths: Paths // REQUIRED. The available paths and operations for the API.
  // components	Components Object	An element to hold various schemas for the specification.
  // security	[Security Requirement Object]	A declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition.
  // tags	[Tag Object]	A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the Operation Object must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
  // externalDocs	External Documentation Object	Additional external documentation.
}

