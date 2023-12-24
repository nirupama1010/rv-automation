const got = require('got');
const sql = require('mssql');
const addContext = require('mochawesome/addContext')
module.exports = {
    postApiCall: async (strURL, strParams) => {
    try {
        const response = await got.post(strURL, strParams);
        return response;
    } catch (error) {
        return error;
    }
},
getApiCall: async (strURL, strParams) => {
    try {
        const response = await got.get(strURL, strParams);
        return response;
    } catch (error) {
        return error;
    }
},
addContext: (object, title, value) => {
    try {
        addContext(object, {
            title: title,
            value: value
        });
    } catch (error) {
        return error
    }
},
sqlServerDataFetch: async (query, parameters = []) => {
    try {
      const pool = await new sql.ConnectionPool(config).connect();
      const request = pool.request();
  
      if (parameters.length > 0) {
        parameters.forEach(param => {
          request.input(param.name, param.type, param.value);
        });
      }
  
      const result = await request.query(query);
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing SQL query:', err.message);
      throw err;
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  }
  
}