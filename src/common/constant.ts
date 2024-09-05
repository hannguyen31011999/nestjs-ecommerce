export const saltOrRounds = 10;
export const defaultPagination = {
  page: 1,
  limit: 10,
};
export const jwtConstants = {
  secret: '900150983cd24fb0d6963f7d28e17f72',
  expired: {
    access_token: '60m',
    refresh_token: '7d',
  },
};

export const msgResponse = {
  user: {
    read: 'Get data user successfully',
    create: 'Create user successfully',
    update: 'Update user successfully',
    delete: 'Delete user successfully',
  },
  signIn: {
    success: 'Signin successfully',
    fail: 'Signin fail',
  },
  signOut: {
    success: 'Logout successfully',
    fail: 'Access denied',
  },
  refreshToken: {
    success: 'Refresh token successfully',
  },
  400: 'Bad request',
  500: 'Internal error server',
  422: 'Validate failed',
};
