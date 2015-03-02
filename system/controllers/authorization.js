/* System Core */
'use strict';
; (function () {
    /**
     * Extend function.
     * @constructor
     * @exports System/AuthorizationController
     */
    var Core = global.Core,
        AuthorizationController = Core.Base.Extend({
            initialize: function () {
                console.log('initialize auth');
            }
        }),
        AuthorizationControllerInstance = new AuthorizationController();

    Core.Namespace('Controllers.Authorization', AuthorizationControllerInstance);
}());