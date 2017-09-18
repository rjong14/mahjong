module.exports = function() {
    return function (collection, expression) {
        var result = false
        if(expression.mode == 'not'){
            result= true
        }

        for( i in collection){

            if(collection[i]._id == expression.data) {
                if(expression.mode == 'not'){
                result = false
                }else{
                    result = true
                }
            }

        }
        return result
    }
};
