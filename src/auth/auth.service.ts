import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '@supabase/supabase-js'; // Import User type

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const supabase = this.supabaseService.getClient();
    const { data, error }: { data: any; error: { message: string } | null } =
      await supabase.auth.signUp({
        email: signUpDto.email,
        password: signUpDto.password,
      });

    if (error) throw new Error(error.message);
    return data;
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const supabase = this.supabaseService.getClient();
    const { data, error }: { data: any; error: { message: string } | null } =
      await supabase.auth.signInWithPassword({
        email: signInDto.email,
        password: signInDto.password,
      });

    if (error) throw new UnauthorizedException(error.message);
    return data;
  }

  async getUserByAccessToken(accessToken: string): Promise<User | null> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data?.user) {
      return null;
    }

    return data.user; // ✅ Now explicitly returning a User or null
  }
} // ✅ ADDED missing closing bracket for AuthService
