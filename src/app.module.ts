import { Module } from '@nestjs/common';
import { featureModules } from './modules';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...featureModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
