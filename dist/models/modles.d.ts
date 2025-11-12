import { IMigrante, IUsuario, IMigranteServicio } from "../utils/utils";
export declare const Models: {
    verificarUsuario(email: string, password: string): Promise<IUsuario | null>;
    insertarMigrante(data: IMigrante): Promise<{
        message: string;
    }>;
    obtenerMigrantePorDocumento(documento: number): Promise<IMigrante | null>;
    insertarMigranteServicio(documento: number, id_servicio: number, solicitudDate: Date): Promise<"success" | "not_found">;
    listarMigranteServicio(): Promise<IMigranteServicio[]>;
    obtenerMigranteServicioPorId(id: number): Promise<IMigranteServicio | null>;
    actualizarMigrante(documento: number, data: Partial<IMigrante>): Promise<{
        message: string;
    }>;
    eliminarMigrante(documento: number): Promise<{
        message: string;
    }>;
    obtenerFamiliaresPorDocumento(documento: number): Promise<any[]>;
    obtenerAtencionesPorDocumento(documento: number): Promise<any[]>;
    crearMigranteServicio(data: IMigranteServicio): Promise<void>;
    actualizarMigranteServicio(id: number, data: Partial<IMigranteServicio>): Promise<number>;
    eliminarMigranteServicio(id: number): Promise<number>;
};
//# sourceMappingURL=modles.d.ts.map