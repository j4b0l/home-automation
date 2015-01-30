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
    
    this.handler = this.onNotificationHandler();
    
    this.twiloPhone = "+4915735982739";
    this.phone = config.phone.toString();
    this.prefix = config.prefix.toString();
    

    this.controller.on('notifications.push', this.handler);
    
};

NotificationSMSde.prototype.stop = function () {
    NotificationSMSde.super_.prototype.stop.call(this);
    
    this.controller.off('notifications.push', this.handler);
    
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

NotificationSMSde.prototype.onNotificationHandler = function () {
    var self = this;

    return function(notice) {
        http.request({
            method: 'POST',
            url: "https://api.twilio.com/2010-04-01/Accounts/ACfcf8b99008431cc604ef23dd3ddf4732/Messages.json",
            data: {
                From: self.twiloPhone,
                To: self.phone,
                Body: self.prefix + " " + notice.message,
                Sid: "ACfcf8b99008431cc604ef23dd3ddf4732",
                AuthToken: "9a0236574e7aa560d6c4269b55dba001"
            }
        });
    };    
};