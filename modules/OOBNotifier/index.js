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
    
    var self = this;

    this.handler = this.onNotificationHandler();

    this.twiloPhone = url.encode(config.twilio_from.toString());
    this.phone = url.encode(config.twilio_to.toString());
    this.sid = config.twilio_sid.toString();
    this.authtoken = config.twilio_authtoken.toString();
    this.prefix = config.prefix.toString();

    self.controller.on('notifications.push', this.handler);
    
};

NotificationSMSde.prototype.stop = function () {
    NotificationSMSde.super_.prototype.stop.call(this);
    
    var self = this;

    self.controller.off('notifications.push', this.handler);
    
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

NotificationSMSde.prototype.onNotificationHandler = function () {
    var self = this;

    return function(notice) {
        http.request({
            method: 'POST',
            url: "https://api.twilio.com/2010-04-01/Accounts/"+ self.sid +"/Messages.json",
            data: {
                From: self.twiloPhone,
                To: self.phone,
                Body: self.prefix + " " + notice.message,
                Sid: self.sid,
                AuthToken: self.authtoken
            }
        });
    };    
};