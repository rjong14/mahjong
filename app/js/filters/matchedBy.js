module.exports = function ()
{
	return function (collection, user)
	{
		var result = [];

        for(i in collection){
            if(collection[i].match.foundBy == user){
                result.push(collection[i])
            }
        }
        return result;
	}
};
