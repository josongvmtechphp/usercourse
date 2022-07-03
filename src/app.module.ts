import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './structures/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { Configurations } from './Configuration';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: Configurations.databaseType,
      host: Configurations.databaseHost,
      username: Configurations.databaseUsername,
      password: Configurations.databasePassword,
      port: Configurations.databasePort,
      database: Configurations.databaseName,
      synchronize: Configurations.databaseSync,
      entities: [User],
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
