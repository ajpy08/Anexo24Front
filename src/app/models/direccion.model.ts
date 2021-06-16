export class Direccion {
    constructor(
        public calle?: string,
        public numero?: string,
        public cp?: string,
        public colonia?: string,
        public domicilioFiscal?: boolean,
        public tipo?: string,
        public estado?: string,
        public entidadFederativaId?: string,
        public _id?: string
    ) {}
}