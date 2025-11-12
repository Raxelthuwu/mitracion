import { IMigrante, IUsuario, IMigranteServicio } from "../utils/utils";
export declare const services: {
    verificarUsuarioService(email: string, password: string): Promise<{
        status: number;
        message: string;
        data: IUsuario;
    } | {
        status: number;
        message: string;
        data: null;
    }>;
    insertarMigranteService(data: IMigrante): Promise<{
        status: number;
        message: string;
        data: IMigrante;
    } | {
        status: number;
        message: string;
        data: null;
    }>;
    obtenerMigrantePorDocumentoService(documento: number): Promise<{
        status: number;
        data: {
            fullname: string;
            document: number;
            age: number;
            gender: string;
            nacionality: string;
            originCountry: string;
            dateArrival: Date;
            email: string;
            phoneNumber: string;
            motive: string;
        };
        message?: undefined;
    } | {
        status: number;
        message: string;
        data: null;
    }>;
    actualizarMigranteService(documento: number, data: Partial<IMigrante>): Promise<{
        status: number;
        message: string;
        data: null;
    }>;
    eliminarMigranteService(documento: number): Promise<{
        status: number;
        message: string;
        data: null;
    }>;
    obtenerFamiliaresPorDocumentoService(documento: number): Promise<{
        status: number;
        message: string;
        data: null;
    } | {
        status: number;
        message: string;
        data: any[];
    }>;
    obtenerAtencionesMigranteService(documento: number): Promise<{
        status: number;
        message: string;
        data: null;
    } | {
        status: number;
        data: any[];
        message?: undefined;
    }>;
    insertarMigranteServicioService(documento: number, id_servicio: number, solicitudDate: Date): Promise<{
        status: number;
        message: string;
        data: null;
    }>;
    listarMigranteServicioService(): Promise<{
        status: number;
        data: IMigranteServicio[];
        message?: undefined;
    } | {
        status: number;
        message: string;
        data: null;
    }>;
    obtenerMigranteServicioPorIdService(id: number): Promise<{
        status: number;
        data: IMigranteServicio;
        message?: undefined;
    } | {
        status: number;
        message: string;
        data: null;
    }>;
    crearMigranteServicioService(data: IMigranteServicio): Promise<{
        status: number;
        message: string;
        data: IMigranteServicio;
    } | {
        status: number;
        message: string;
        data: null;
    }>;
    actualizarMigranteServicioService(id: number, data: Partial<IMigranteServicio>): Promise<{
        status: number;
        message: string;
        data: null;
    }>;
    eliminarMigranteServicioService(id: number): Promise<{
        status: number;
        message: string;
        data: null;
    }>;
};
//# sourceMappingURL=services.d.ts.map