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
  role: {
    read: 'Get data role successfully',
    create: 'Create role successfully',
    update: 'Update role successfully',
    delete: 'Delete role successfully',
  },
  permission: {
    read: 'Get permissions successfully',
  },
  exist: {
    roleName: 'Role name already exists',
    phoneNumber: 'Phone number already exists',
    email: 'Email already exists',
  },
  400: 'Bad request',
  500: 'Internal error server',
  422: 'Validate failed',
};
