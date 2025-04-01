import { Injectable, ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
    private Client;

    constructor(private configService: ConfigService) {
        this.Client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
    
    async sendVerificationPhoneNumber(number: number, name: string, code: string): Promise<void> {
        try {
            this.Client.messages.create({
                from: '+13133492183',
                body: `Hola ${name}. Prueba verificacion por numero telefonico, tu codigo de verificacion es ${code}`,
                to: `+57${number}`,
                channel: 'sms'});
        } catch (error) {
            throw new ConflictException(`Error al enviar codigo, ${error}`);
        }
    }

    async sendVerificationPhoneNumberV2(number: number, name: string): Promise<void> {
        try {
            this.Client.verify.v2.services("VA1a854ef6ecede0a66517829a62dd4b0a").verifications.create({
                from: '+573017113349',
                body: `Hola ${name}. Prueba verificacion por numero telefonico` ,
                to: `+57${number}`,
                channel: 'sms'});
        } catch (error) {
            throw new ConflictException(`Error al enviar codigo, ${error}`);
        }
    }
}