import { Request, Response } from "express";
export declare const Controllers: {
    verificarUsuarioController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    insertarMigranteController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    obtenerMigrantePorDocumentoController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    insertarMigranteServicioController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    listarMigranteServicioController(req: Request, res: Response): Promise<void>;
    obtenerMigranteServicioPorIdController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    crearMigranteServicioController(req: Request, res: Response): Promise<void>;
    actualizarMigranteServicioController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    eliminarMigranteServicioController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    actualizarMigranteController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    eliminarMigranteController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    obtenerFamiliaresPorDocumentoController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    obtenerAtencionesMigranteController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=controllers.d.ts.map