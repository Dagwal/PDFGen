import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream, mkdirSync } from 'fs';
import * as path from 'path';
import Certificate from 'src/Template/Template';
import { CertificateAProps } from 'src/model/certModel';
import { Readable } from 'stream';

@Injectable()
export class CertificateService {
  async generateCertificate(data: CertificateAProps): Promise<Readable> {
    try {
      const userName = data.userName || 'default';
      const sanitizedUserName = userName.toString().replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${sanitizedUserName}_Certificate.pdf`;
      
      // Ensure that the 'generatedFiles' directory exists
      const dirPath = path.join(__dirname, '..', 'generatedFiles');
      mkdirSync(dirPath, { recursive: true }); // The { recursive: true } option is used to create parent directories if they don't already exist.
      
      const filePath = path.join(dirPath, fileName);
      const writeStream = createWriteStream(filePath);
      
      // Calling the template render func with dynamic data
      const result = await Certificate(data);

      // Pipe the PDF stream to the file
      result.pipe(writeStream);

      // Wait for the file write to finish
      await new Promise<void>((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      // Create a readable stream for the saved file
      const fileStream = createReadStream(filePath);

      return fileStream;
    } catch (err) {
      console.error('Error:', err);
      throw new Error('Internal Server Error');
    } 
  }
}
