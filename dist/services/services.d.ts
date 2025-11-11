import { IMigrante } from "../utils/utils";
export declare const services: {
    verificarUsuarioService(email: string, password: string): Promise<{
        status: number;
        message: string;
    }>;
    insertarMigranteService(data: IMigrante): Promise<{
        status: number;
        message: string;
    }>;
    actualizarMigranteService(documento: number, data: Partial<IMigrante>): Promise<{
        status: number;
        message: string;
    }>;
    eliminarMigranteService(documento: number): Promise<{
        status: number;
        message: string;
    }>;
};
//# sourceMappingURL=services.d.ts.map