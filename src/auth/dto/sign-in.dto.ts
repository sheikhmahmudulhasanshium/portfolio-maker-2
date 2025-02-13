import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email!: string; // Add "!"

  @IsNotEmpty()
  password!: string; // Add "!"
}
