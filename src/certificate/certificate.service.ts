import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream, mkdirSync } from 'fs';
import { Readable } from 'stream';
import { toDataURL } from 'qrcode';
import * as path from 'path';
import Certificate from 'src/Template/page';


export interface CertificateAProps{
  userName: string;
} 

@Injectable()
export class CertificateService {
  async generateCertificate(data: CertificateAProps): Promise<Readable> {
    try {
      const userName = data.userName || 'default';
      const sanitizedUserName = userName.toString().replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${sanitizedUserName}-Certificate.pdf`;

      const dirPath = path.join('GeneratedCertificates');
      mkdirSync(dirPath, { recursive: true });

      const filePath = path.join(dirPath, fileName);
      const writeStream = createWriteStream(filePath);


      const qrUrl = await toDataURL("I am just testing it", { margin: 0 }) ?? ""
      // console.log(qrUrl);


      // Calling the template render func with dynamic data
      const result = await Certificate({
        id: "",
        data:  [
          { label: 'Supplier Code', value: "ID" },
          {label: 'Supplier Name',value: 'Global Warehousing and Stock Management Limited',},
          {label: 'Postal Address',value: 'P.o. Box 20413,Kawale, Lilongwe 2',},
          {label: 'Supplier Location',value: 'Lilongwe',},
          {label: 'Website',value: '',},
          {label: 'Country of Establishment',value: 'Malawi',},
          {label: 'Goods Category',value: '',},
          {label: 'Services Category',value: 'Above MK 1 Billion',},
          {label: 'Expire Date',value: '23/05/2024',},
        ],
        qrCodeUrl: qrUrl,
      });

      // Ensure that the result is treated as a Readable stream
      if (!(result instanceof Readable)) {
        throw new Error('Certificate function did not return a Readable stream');
      }

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
