import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ) : Observable<any> {

        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const now = Date.now();

        return next
            .handle()
            .pipe(
                tap(() => Logger.log(
                    `${method} ${url} ${Date.now() - now}`, 
                    context.getClass().name
                    ),
                ),
            );
    }
}