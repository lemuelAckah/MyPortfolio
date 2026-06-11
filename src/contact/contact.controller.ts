import { Controller, Post, Body } from '@nestjs/common';

@Controller('contact')
export class ContactController {
  @Post()
  handleContactForm(@Body() contactData: { name: string; email: string; message: string }) {
    console.log('Received contact form submission:', contactData);
    
    // In a real application, you would send an email or save to a database here.
    return {
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
    };
  }
}
