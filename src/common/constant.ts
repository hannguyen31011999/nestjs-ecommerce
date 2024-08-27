export const saltOrRounds = 10;
export const defaultPagination = {
  page: 1,
  limit: 10,
};
export const jwtConstants = {
  secret: '900150983cd24fb0d6963f7d28e17f72',
};

export const msgResponse = {
  user: {
    read: 'Get data user successfully',
    create: 'Create user successfully',
    update: 'Update user successfully',
    delete: 'Delete user successfully',
  },
  400: 'Bad request',
  500: 'Internal error server',
  422: 'Validate failed',
};
