/* System: Loaded Cors Handler */
'use strict';
; (function () {
    var Cors = function (request) {
        var result = null,
            defaultResponse;

        if (request.method === 'OPTIONS') {
            defaultResponse = Core.Namespace('Handlers.Endpoint').getDefaultResponse();
            result = _.extend(defaultResponse, {
                body: null
            });
        }

        return result;
    };

    Core.Namespace('Handlers.Cors', Cors);
}());