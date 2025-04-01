import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete, 
    UseGuards, 
    HttpCode, 
    HttpStatus 
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { 
    CreateUserDto, 
    UpdateUserDto, 
    LoginDto, 
    RefreshTokenDto, 
    ChangePasswordDto, 
    VerifyEmailDto, 
    VerifyPhoneNumberDto
  } from './dto/user.dto';
  import { JwtAuthGuard } from './guards/jwt-auth.guard';
  import twilio from 'twilio';
import Twilio from 'twilio/lib/rest/Twilio';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post('signup')
    async create(@Body() createUserDto: CreateUserDto) {
      //await this.usersService.createWithEmail(createUserDto);
      await this.usersService.createWithPhoneNumber(createUserDto);
      return { message: 'User registered successfully. Please check your phone number for verification code.' };
    }
  
    @Post('verify-email')
    verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
      return this.usersService.verifyEmail(verifyEmailDto);
    }

    @Post('verify-phoneNumber')
    verifyPhoneNumber(@Body() verifyNumberDto: VerifyPhoneNumberDto) {
        return this.usersService.verifyPhoneNumber(verifyNumberDto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
      return this.usersService.login(loginDto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
      return this.usersService.refreshToken(refreshTokenDto.refreshToken);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
      return this.usersService.findAll();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.usersService.findOne(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(id, updateUserDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.usersService.remove(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post(':id/change-password')
    changePassword(
      @Param('id') id: string,
      @Body() changePasswordDto: ChangePasswordDto,
    ) {
      return this.usersService.changePassword(id, changePasswordDto);
    }
  }
  