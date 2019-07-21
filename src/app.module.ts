import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './modules/post/post.controller';
import { PostService } from './modules/post/post.service';
import { PostModule } from './modules/post/post.module';
import {resolve} from 'path';
// const { 
//   TYPEORM_CONNECTION, 
//   TYPEORM_HOST, 
//   TYPEORM_PORT, 
//   TYPEORM_USERNAME, 
//   TYPEORM_PASSWORD, 
//   TYPEORM_DATABASE, 
//   TYPEORM_SYNCHRONIZE, 
//   TYPEORM_LOGGING 
// } = process.env;


@Module({
  imports: [
    ConfigModule.load( resolve(__dirname, 'config/**/!(*.d).{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    TypeOrmModule.forRootAsync({ 
      useFactory: async ( config: ConfigService ) => ({
        type: config.get('database.TYPEORM_CONNECTION'),
        host: config.get('database.TYPEORM_HOST'),
        port: config.get('database.TYPEORM_PORT'),
        username: config.get('database.TYPEORM_USERNAME'),
        password: config.get('database.TYPEORM_PASSWORD'),
        database: config.get('database.TYPEORM_DATABASE'),
        synchronize: config.get('database.TYPEORM_SYNCHRONIZE'),
        logging: config.get('database.TYPEORM_LOGGING'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ ConfigService ],
    }),
    PostModule,
  ],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
