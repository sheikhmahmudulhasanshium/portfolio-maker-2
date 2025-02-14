import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from './supabase/supabase.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller'; // ✅ Import AppController

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController], // ✅ Register AppController
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class AppModule {}
