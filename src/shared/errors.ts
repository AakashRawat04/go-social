export const ERRORS = {
  SERVER_ERROR: {
    code: 500,
    message: {
      error: 'Server Error',
      error_description: 'Something bad happened at the server.',
    },
  },
  MISSING_ACCESS_TOKEN: {
    code: 401,
    message: {
      error: 'unauthorized',
      error_description: 'Authorization token is required',
    },
  },
  INVALID_ACCESS_TOKEN: {
    code: 401,
    message: {
      error: 'unauthorized',
      error_description: 'Invalid token',
    },
  },
  RESOURCE_NOT_FOUND: {
    code: 404,
    message: {
      error: 'not found',
      error_description: 'Resource was not found',
    },
  },
  MALFORMED_BODY: {
    code: 400,
    message: {
      error: 'bad request',
      error_description: 'Malformed body passed',
    },
  },
  USER_NOT_FOUND: {
    code: 404,
    message: {
      error: 'not found',
      error_description: 'User Does Not Exsist',
    },
  },
};
