import Admin from "../models/Admin";
import ApiResult from "../utils/ApiResult";

class AdminController {
    async index(req, resp) {
        try {
            const { page = 1, limit = 10 } = req.query;

            const { conditions } = await Admin.parseConditions(req.query);

            const { count, rows } = await Admin.findAndCountAll({
                where: conditions,
                limit,
                offset: (page - 1) * limit,
                attributes: ["id", "name", "login"],
            });

            const data = {
                current_page: parseInt(page, 10),
                total_pages: Math.ceil(count / limit),
                total: count,
                admins: rows,
            };

            const response = ApiResult.parseResult(
                true,
                { data },
                "Admin(s) retornado(s) com sucesso."
            );

            return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                "ADMIN_INDEX_NOT_FOUND",
                error.message ? error.message : error,
                "Não foram econtrados dados para serem listados."
            );
            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }

    async show(req, resp) {
        try {
            const id = parseInt(req.params.id, 10);

            const admin = await Admin.findOne({
                where: { id },
                attributes: ["id", "name", "login"],
            });

            if (!admin) {
                throw Error("Não foi possivel buscar o(a) admin pelo ID");
            }

            const response = ApiResult.parseResult(
                true,
                { admin },
                "Admin retornado(a) com sucesso."
            );

            return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                "ADMIN_NOT_FOUND",
                error.message ? error.message : error,
                "Admin não encontrado(a)."
            );

            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }

    async store(req, resp) {
        try {
            const admin = await Admin.create(req.body);

            const response = ApiResult.parseResult(
                true,
                {
                    admin: {
                        id: admin.id,
                        name: admin.name,
                        login: admin.login,
                    },
                },
                "Admin cadastrado(a) com sucesso."
            );

            return resp.status(ApiResult.OK_CREATED).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                "ADMIN_NOT_CREATED",
                error.message ? error.message : error,
                "Não foi possível adicionar o(a) admin."
            );
            return resp.status(ApiResult.BAD_REQUEST).json(response);
        }
    }

    async update(req, resp) {
        try {
            const id = parseInt(req.params.id, 10);

            const updated = await Admin.update(req.body, {
                where: { id },
            });

            if (!updated) {
                throw Error("Erro ao atualizar o(a) admin.");
            }

            const response = ApiResult.parseResult(
                true,
                "ADMIN_UPDATED",
                "Admin atualizado(a) com sucesso."
            );

            return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                "ADMIN_UPDATE_ERROR",
                error.message ? error.message : error,
                "Erro ao atualizar o(a) admin."
            );
            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }

    async delete(req, resp) {
        try {
            const id = parseInt(req.params.id, 10);

            const admin = await Admin.findByPk(id);

            if (!admin) {
                throw Error("Não foi possível buscar o(a) admin pelo ID");
            }

            await Admin.destroy({ where: { id } });

            const response = ApiResult.parseResult(
                true,
                "ADMIN_DELETED",
                "Admin excluído(a) com sucesso."
            );

            return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                "ADMIN_DELETE_ERROR",
                error.message ? error.message : error,
                "Erro ao deletar o(a) admin."
            );

            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }
}

export default new AdminController();
