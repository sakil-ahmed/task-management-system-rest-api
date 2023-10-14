import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { WorkspaceModule } from './workspace/workspace.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>("MONGO_DB_URI")
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    WorkspaceModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
