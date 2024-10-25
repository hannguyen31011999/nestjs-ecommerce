import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionController } from 'src/app/controllers/permission.controller';
import { PermissionService } from 'src/app/services/permission.service';
import {
  Permission,
  PermissionSchema,
} from 'src/database/schemas/permission.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Permission.name,
        useFactory: () => {
          const schema = PermissionSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
