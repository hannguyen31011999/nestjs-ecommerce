import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { RoleModule } from './modules/role.module';
import { PermissionModule } from './modules/permission.module';
const mongooseURL = 'mongodb://localhost:27017/';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING || mongooseURL, {
      dbName: 'e-commerce',
    }),
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
