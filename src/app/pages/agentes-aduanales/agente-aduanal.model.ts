export class AgenteAduanal {
    constructor(
        public patente?: number,
        public nombre?: string,
        public rfc?: string,
        public curp?: string,
        public calle?: string,
        public numero?: string,
        public cp?: string,
        public colonia?: string,
        // public domicilioFiscal?: boolean,
        // public tipo?: boolean,
        public estado?: boolean,
        public userAltaId?: string,
        public agenteAduanalId?: string,
        public entidadId?: string,
    ) { }
}
