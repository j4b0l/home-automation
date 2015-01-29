/*** PhoneService Z-Way HA module *******************************************

Version: 1.0.0
(c) Z-Wave.Me, 2014
-----------------------------------------------------------------------------
Author: Niels Roche <nir@zwave.me>
Description:
    This module allows you to phone via german phoneservice.

******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function PhoneService (id, controller) {
    // Call superconstructor first (AutomationModule)
    PhoneService.super_.call(this, id, controller);
}

inherits(PhoneService, AutomationModule);

_module = PhoneService;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

PhoneService.prototype.init = function (config) {
    PhoneService.super_.prototype.init.call(this, config);
    /*
    this.handler = this.onNotificationHandler();
        
    this.api_key = config.api_key.toString();
    this.phone = config.phone.toString();
    this.prefix = config.prefix.toString();

    this.controller.on('notifications.push', this.handler);
    */
};

PhoneService.prototype.stop = function () {
    PhoneService.super_.prototype.stop.call(this);
    /*
    this.controller.off('notifications.push', this.handler);
    */
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

PhoneService.prototype.onNotificationHandler = function () {
    /*var self = this;

    return function(notice) {
        http.request({
            method: 'GET',
            url: "https://sms2.cdyne.com/sms.svc/SecureREST/SimpleSMSsend",
            data: {
                LicenceKey: self.api_key,
                PhoneNumber: self.phone,
                Message: self.prefix + " " + notice.message
            }
        });
    };
    */
    
};

//https://sms2.cdyne.com/sms.svc/SecureREST/SimpleSMSsend?PhoneNumber={00491624763650}&Message={HelloWorld}&LicenseKey={364e9666-e76f-4089-a5d8-704394db6ebb}