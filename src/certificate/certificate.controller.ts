import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CertificateService } from './certificate.service';
import { Readable } from 'stream';

@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get('generate')
  async generateCertificate(
    @Res() res: Response,
    @Query('userName') userName: string,
  ): Promise<void> {
    try {
      const certificateData = { userName };
      const pdfStream: Readable = await this.certificateService.generateCertificate(certificateData);

      // Set up the response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${userName}_Certificate.pdf`);

      // Pipe the PDF stream to the response
      pdfStream.pipe(res);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  }
}