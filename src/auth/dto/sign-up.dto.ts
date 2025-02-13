import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email!: string; // Add "!" to avoid TypeScript strict errors

  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
