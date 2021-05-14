import { Cliente } from '../../models/cliente';

export class Usuario {
    constructor(
        public nombre?: string,
        public email?: string,
        public password?: string,
        public estado?: string,
        public userId?: string
        // public role?: number,
        // public img?: boolean,
        // public empresas?: Cliente[],
    ) {}
}
