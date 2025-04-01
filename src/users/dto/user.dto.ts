import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsOptional,
    IsNumber,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsNumber()
    phoneNumber: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
  }
  
  export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsNotEmpty()
    @IsNumber()
    phoneNumber: Number;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;
  }
  
  export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }
  
  export class RefreshTokenDto {
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
  }
  
  export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    currentPassword: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    newPassword: string;
  }
  
  export class VerifyEmailDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    code: string;
  }

  export class VerifyPhoneNumberDto {
    @IsNotEmpty()
    @IsNumber()
    phoneNumber: number;
  
    @IsNotEmpty()
    @IsString()
    code: string;
  }