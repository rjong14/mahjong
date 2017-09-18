
module.exports = function ()
{
	return function (collection)
	{
		var result = [];

        for(i in collection){
            if(!collection[i].match){
                result.push(collection[i])
            }
        }
        return result;
	}
};
