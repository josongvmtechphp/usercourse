import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { Configurations } from './Configuration';
import { CourseModule } from './course/course.module';
import { Course } from './database/entity/couse.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CourseModule,
    TypeOrmModule.forRoot({
      type: Configurations.databaseType,
      host: Configurations.databaseHost,
      username: Configurations.databaseUsername,
      password: Configurations.databasePassword,
      port: Configurations.databasePort,
      database: Configurations.databaseName,
      synchronize: Configurations.databaseSync,
      entities: [User, Course],
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: Configurations.secret,
      signOptions: { expiresIn: Configurations.expiresIn },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
