import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/app/controllers/user.controller';
import { IsEmailExistConstraint } from 'src/app/filter/validate-exception.filter';
import { UserService } from 'src/app/services/user.service';
import { User, UserSchema } from 'src/database/schemas/user.schema';

@Module({
  controllers: [UserController],
  providers: [UserService, IsEmailExistConstraint],
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
  exports: [UserService],
})
export class UserModule {}
