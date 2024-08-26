import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user.module';
const mongooseURL = 'mongodb://localhost:27017/';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING || mongooseURL, {
      dbName: 'e-commerce',
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
