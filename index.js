export default convertAWSObjectToFlatObject = function(awsObject) {
  return _.reduce(awsObject, function(result, val, key) {
    result[key] = val.S || val.N;
    return result;
  }, {});
}

/*
  Returns an object with an UpdateExpression and 
*/
export default generateDynamoUpdateExpr = function(awsObject, excludeKeys = []) {

  return _.reduce(awsObject, function(result, val, key, index) {
    if (excludeKeys.indexOf(key) !== -1) {
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
