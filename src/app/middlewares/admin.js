import Admin from "../models/Admin";
import ApiResult from "../utils/ApiResult";

function validateData(req, resp, next) {
    const { name, login, password } = req.body;

    try {
        if (typeof name !== "string" || name.length === 0) {
            throw Error(
                "Não foi possivel validar os dados enviados. Verifique o campo nome."
            );
        }
        if (typeof login !== "string" || login.length === 0) {
            throw Error(
                "Não foi possivel validar os dados enviados. Verifique o campo login."
            );
        }
        if (typeof password !== "string" || password.length === 0) {
            throw Error(
                "Não foi possivel validar os dados enviados. Verifique o campo senha."
            );
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            "INVALID_ADMIN_DATA_PARAMS",
            error.message ? error.message : error,
            "Dados enviados inválidos. Por favor verifique os campos preenchidos."
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

async function verifyNameParam(req, resp, next) {
    try {
        const { name } = req.query;

        if (name) {
            if (/[0-9]+/.test(name)) {
                throw Error(
                    "Não foi possivel validar o parâmetro nome. Por favor verifique se o nome está correto e efetue uma nova pesquisa."
                );
            }

            const admin = await Admin.findOne({
                where: { name },
            });

            if (!admin) {
                throw Error(
                    "Não foi possível encontrar nenhum admin com o nome pesquisado."
                );
            }
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            "INVALID_NAME_PARAMS",
            error.message ? error.message : error,
            "Parâmetro nome inválido. Por favor verifique se o nome está correto.",
            Error
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

async function validateAdminExist(req, resp, next) {
    const id = parseInt(req.params.id, 10);

    try {
        if (id.length === 0) {
            throw Error(
                "Parâmetro ID obrigatório para requisição não informado."
            );
        }
        if (!Number.isInteger(id)) {
            throw Error("Parâmetro ID deve ser um número inteiro.");
        }

        const admin = await Admin.findOne({
            where: { id },
        });

        if (!admin) {
            throw Error(
                "Não foi possível encontrar o(a) admin com o ID informado."
            );
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            "ADMIN_DATA_NOT_FOUND",
            error.message ? error.message : error,
            Error
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

async function compareLogins(req, resp, next) {
    const { id } = req.params;
    const { login } = req.body;

    try {
        if (id) {
            const admin = await Admin.findByPk(id);

            if (admin.login === login) {
                throw Error(
                    "Nenhum dado relacionado ao parâmetro ID encontrado."
                );
            }
        }

        if (!id) {
            const admin = await Admin.findOne({
                where: { login },
            });

            if (admin) {
                throw Error(
                    "O login informado já existe. Por favor cadastre um login diferente."
                );
            }
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            "ADMIN_DATA_NOT_FOUND",
            error.message ? error.message : error,
            Error
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

export { validateData, validateAdminExist, compareLogins, verifyNameParam };
