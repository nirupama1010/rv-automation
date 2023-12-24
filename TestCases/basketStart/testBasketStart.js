const got = require('got');
const { assert } = require('chai');
const HTTPStatusCode = require('http-status-code');
const sql = require('mssql');
const basketStartTestData = require('../../configurationTestData/Test-Data/createBasket/basketStart.json');
const genericMethods = require('../../genericMethods/generic_methods');
const config = require('../../configurationTestData/Test-Data/config/test_config');
const basketAddArticle = require('../../configurationTestData/Test-Data/basketAddArticle/basketAddArticle.json');
const dataGeneration = require('../../configurationTestData/Test-Data/dataGeneration/dataGeneration');
const { func } = require('prop-types');
var basketID;
var customerID = "1234";
describe(" Basket Start", async function () {
    before(async function () {
        console.log("I am Mocha Before Hook");
    })
    it(" Verify that basket start is suceesful ", async function () {
        let body = JSON.stringify(basketStartTestData)
        // body= dataGeneration.updateFieldValue(body,"customerId",customerID);  To update request body before calling API
        console.log("Updated Body is *****", body)
        URL_BASKET_START = `${config.BASE_URL}/Basket/Start`;  // URL Formation 
        //POST Request
        resp = await genericMethods.postApiCall(URL_BASKET_START, {
            body: body,
            headers: {
                "Content-Type": "application/json",
            }
        })
        // Adding inout and output to the HTML Report
        genericMethods.addContext(this, "Input", body); // info in the report
        genericMethods.addContext(this, "Output", resp.body); // info in the report
        let bodyObj = JSON.parse(resp.body);
        basketID = bodyObj.basketId;
        //console.log("basketID******",basketID)
        //console.log("resonse" , resp)
        if (resp !== undefined) {
            console.log("Response is ", resp);
            assert.equal(resp.statusMessage, HTTPStatusCode.getMessage(200));
            assert.exists(bodyObj.basketId);
        }
        else {
            assert.fail(resp, " is undefined");
        }
    });

    it("Add article", async function () {
        let body = JSON.stringify(basketAddArticle)
        body = dataGeneration.updateFieldValue(body, "basketId", basketID);  //To update request body before calling API
        //body= dataGeneration.updateFieldValue(body,"barcode",12345678);
        console.log("Updated Body fo ADD Article is *****", body)
        URL_BASKET_ADD_ARTICLE = `${config.BASE_URL}/Basket/Add`;  // URL Formation 
        //POST Request
        resp = await genericMethods.postApiCall(URL_BASKET_ADD_ARTICLE, {
            body: body,
            headers: {
                "Content-Type": "application/json",
            }
        })
        // Adding input and output to the HTML Report
        genericMethods.addContext(this, "Input", body); // info in the report
        genericMethods.addContext(this, "Output", resp.body); // info in the report
        let bodyObj = JSON.parse(resp.body);
        console.log(" bodyObj for add article ", bodyObj)
    })

    it.only("should execute a SQL Server query", async function () {
        const query = "SELECT * FROM YourTable";
        try {
          const result = await sendSQLServerQuery(query);
          console.log('Query result:', result);
          // Add assertions based on the expected result
          expect(result).to.exist;
          // Add more assertions as needed
        } catch (error) {
          console.error('Error:', error.message);
          throw error; // Rethrow the error to fail the test
        }
      });

})