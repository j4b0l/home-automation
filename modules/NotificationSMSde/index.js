/*** NotificationSMSde Z-Way HA module *******************************************

Version: 1.0.0
(c) Z-Wave.Me, 2014
-----------------------------------------------------------------------------
Author: Niels Roche <nir@zwave.me>
Description:
    This module allows you to phone via german NotificationSMSde.

******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function NotificationSMSde (id, controller) {
    // Call superconstructor first (AutomationModule)
    NotificationSMSde.super_.call(this, id, controller);
}

inherits(NotificationSMSde, AutomationModule);

_module = NotificationSMSde;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

NotificationSMSde.prototype.init = function (config) {
    NotificationSMSde.super_.prototype.init.call(this, config);
    
    this.handler = this.onNotHandler();
        
    this.phone = config.phone.toString();
    this.prefix = config.prefix.toString();
    this.countryPrefix = config.intl.toString();

    this.controller.on('notifications.push', this.handler);
    
};

NotificationSMSde.prototype.stop = function () {
    NotificationSMSde.super_.prototype.stop.call(this);
    
    this.controller.off('notifications.push', this.handler);
    
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

NotificationSMSde.prototype.onNotHandler = function () {
    var self = this;

    return function(notice) {
        http.request({
            method: 'POST',
            url: "http://textbelt.com/" + self.countryPrefix,
            data: {
                number: encodeURI(self.phone),
                message: self.prefix + " " + notice.message
            }
        });
    };    
};