export interface CertificateAProps{
    // mood: "view" | "download"| "print";
    userName: string;
    signerName1: string;
    signerName2: string;
} 
export interface PdfGen {
    data:CertificateAProps,
    options:{

    }
}