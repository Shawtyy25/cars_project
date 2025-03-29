export async function loginCheckQuery(client, name, password) {
    const query = `SELECT * FROM users WHERE (name = $1 OR email = $1) AND password = $2`;

    try{
        const result = await client.query(query, [name, password]);
        console.log(JSON.stringify(result.rows, null, 2));

        return result;

    }catch (e) {
        console.error(`Error: ${e}`)
    }

}