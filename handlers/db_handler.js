export default class db {
    constructor(
        dbClient // This can be only PG client by now.
    ){
        this._dbClient = dbClient;
    }

    async exec(queryString, params) {
        let res = null;
        try {
            res = await this._dbClient.query(queryString, params);
        } catch (err) {
            console.error('Error ejecutando la consulta:', err);
        }
        return res.rows
    }

}