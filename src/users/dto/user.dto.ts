import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsOptional,
    IsNumber,
    IsEnum,
  } from 'class-validator';
  
  export enum UserRole{
    USER = 'user',
    EDITOR = 'editor',
    ADMIN = 'admin',
  }

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

    @IsOptional()
    @IsEnum(UserRole, {message: 'Role must be one of: user, editor, admin'})
    role?: UserRole = UserRole.EDITOR;
  
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

    @IsOptional()
    @IsEnum(UserRole, {message: 'Role must be one of: user, editor, admin'})
    role?: UserRole;
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