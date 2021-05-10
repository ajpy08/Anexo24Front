import { Cliente } from './cliente';

export class Usuario {
    constructor(
        public nombre?: string,
        public email?: string,
        public password?: string,
        // public role?: number,
        // public img?: boolean,
        // public empresas?: Cliente[],
        public estado?: string,
        public _id?: string
    ) {}
}
