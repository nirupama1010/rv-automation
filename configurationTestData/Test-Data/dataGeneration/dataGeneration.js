module.exports = {
    updateFieldValue(body, fieldName, newValue) {
        jsonData = JSON.parse(body);
        jsonData[fieldName] = newValue;
        return JSON.stringify(jsonData);
    }
}