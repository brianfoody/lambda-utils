var _ = require('lodash')

var convertAWSObjectToFlatObject = function(awsObject) {
  return _.reduce(awsObject, function(result, val, key) {
    result[key] = val.S || val.N;
    return result;
  }, {});
}

var convertObjectToLowerCaseKeys = function(awsObject) {
  return _.reduce(awsObject, function(result, val, key) {
    result[key.toLowerCase()] = val;
    return result;
  }, {});
}

var generateDynamoUpdateExpr = function(awsObject, excludeKeys) {

  var exclude = excludeKeys || []

  return _.reduce(awsObject, function(result, val, key, index) {
    if (exclude.indexOf(key) !== -1) {
      return result;
    } 

    var valKey = ":a" + result.Count;
    result["UpdateExpression"] = result["UpdateExpression"] + (" " + key + " = " + valKey);
    result["ExpressionAttributeValues"][valKey] = val;
    result["Count"] += 1
    return result;
  }, {
    UpdateExpression: "set ",
    ExpressionAttributeValues: {},
    Count: 1
  });
}

module.exports = {
  toFlatObject: convertAWSObjectToFlatObject,
  toLowerCaseKeys: convertObjectToLowerCaseKeys,
  toUpdateExpression: generateDynamoUpdateExpr
};
