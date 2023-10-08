import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Photo } from './photos/entities/photo.entity';
import { PhotosModule } from './photos/photos.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './core/filters/all-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'testuser',
      password: 'testpass',
      database: 'world_x',
      entities: [User, Photo],
      synchronize: true,
    }),
    UsersModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
