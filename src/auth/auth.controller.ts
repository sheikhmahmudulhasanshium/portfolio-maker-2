import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '@supabase/supabase-js'; // ✅ Import User type

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return this.authService.signIn(signInDto);
  }

  @Get('profile')
  async getProfile(
    @Headers('Authorization') authorizationHeader: string | undefined,
  ): Promise<User | null> {
    // ✅ Explicitly typed return value
    if (!authorizationHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    const accessToken = authorizationHeader.replace('Bearer ', '').trim();
    if (!accessToken) {
      throw new UnauthorizedException('No access token provided');
    }

    const user: User | null =
      await this.authService.getUserByAccessToken(accessToken); // ✅ Now properly typed
    if (!user) {
      throw new UnauthorizedException('Invalid or expired access token');
    }

    return user;
  }
}
