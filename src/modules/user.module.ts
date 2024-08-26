import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/app/controllers/user.controller';
import { UserService } from 'src/app/services/user.service';
import { IsEmailAlreadyExist } from 'src/app/validator/email-exist.validator';
import { User, UserSchema } from 'src/database/schemas/user.schema';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService, IsEmailAlreadyExist],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  exports: [IsEmailAlreadyExist],
})
export class UserModule {}
