import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import { JWT_HEADER_PARAM, verifyJWT } from '../shared/utils';

@Injectable()
export class JWTGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();

        const jwtTokenRequest = request.headers[JWT_HEADER_PARAM] || null;

        if (!jwtTokenRequest) {
            return false;
        }

        return verifyJWT(jwtTokenRequest);
    }
}
