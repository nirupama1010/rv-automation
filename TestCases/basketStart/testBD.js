const sql = require("mssql");

describe("DB connection check", async function () {
  it("Connection Test", async function () {
    const sqlConfig = {
        user: 'SelfScan',
        password: 'SelfScan',
        database: 'SELFSCAN',
        server: 'INLEN8520082057\\SQLEXPRESS',
        options: {
            encrypt: false,  // Change to true if using encryption
        }
      };
      

    const executeQuery = async () => {
      try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT * FROM TICKETSTORAGE WHERE TICKETID = 'LST5l--wkEOU0lvGZTqMCw' ORDER BY LASTACTION DESC`;
        console.log("result", result);
        console.dir(result);
      } catch (err) {
        console.error("Error Log", err);
      } finally {
        // Close the connection when done
        await sql.close();
      }
    };

    // Call the async function
    await executeQuery();
  });
});
