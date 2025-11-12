import { Request, Response } from "express";
export declare const Controllers: {
    verificarUsuarioController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    insertarMigranteController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    actualizarMigranteController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    eliminarMigranteController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    obtenerFamiliaresPorDocumentoController(req: Request, res: Response): Promise<void>;
    obtenerAtencionesMigranteController(req: Request, res: Response): Promise<void>;
};
//# sourceMappingURL=controllers.d.ts.map