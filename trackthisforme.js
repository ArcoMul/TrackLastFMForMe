var request = require('request');
var _ = require('underscore');

module.exports = function (access_token) {
    return {
        addElement: function (category, element, onError, onSuccess) {    
            if (_.isUndefined(element.value)) {
                return onError("value can't be undefined");
            }
            request.post('https://www.trackthisfor.me/api/v1/categories/' + category+'/elements?access_token=' + access_token, { 
                form: {
                    element: element
                }
            },
            function (error, response, body) {
                if (error) {
                    return onError(error);
                }
                onSuccess();
            });
        }
    };
}
