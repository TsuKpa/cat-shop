import { ClientCommon } from './common';
import { ClientFetch } from './fetch';

export namespace Utils {
    export class Fetch extends ClientFetch {}
    export class Common extends ClientCommon {}
}
