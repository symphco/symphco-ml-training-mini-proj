import { Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
    constructor(private readonly otpservice:OtpService){}
    @Post()
    generateOTP(){
        return this.otpservice.getOTP();
    }
}
    
    
