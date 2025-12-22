import { Injectable } from '@nestjs/common';
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';

@Injectable()
export class HttpConfig implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 10000,
      maxRedirects: 3,
    };
  }
}
