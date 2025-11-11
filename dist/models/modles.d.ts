import { IMigrante, IUsuario } from "../utils/utils";
export declare const Models: {
    verificarUsuario(email: string, password: string): Promise<IUsuario | null>;
    insertarMigrante(data: IMigrante): Promise<{
        message: string;
    }>;
    actualizarMigrante(documento: number, data: Partial<IMigrante>): Promise<{
        message: string;
    }>;
    eliminarMigrante(documento: number): Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=modles.d.ts.map