import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  HttpService,
} from '@nestjs/axios';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createHttpOptions(): HttpModuleOptions | Promise<HttpModuleOptions> {
    return {
      baseURL: this.configService.get<string>(
        'PASTE YOUR THIRD PARTY BASE URL HERE',
      ),
    };
  }
}
