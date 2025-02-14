import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>(
      'NEXT_PUBLIC_SUPABASE_URL',
    );
    const supabaseAnonKey = this.configService.get<string>(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    );

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Supabase credentials are missing from environment variables',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
