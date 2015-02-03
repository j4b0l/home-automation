/*** OOBNotifier Z-Way HA module *******************************************

Version: 1.0.0
(c) Z-Wave.Me, 2014
-----------------------------------------------------------------------------
Author: Niels Roche <nir@zwave.me>
Description:
    This module allows you to phone via german OOBNotifier.

******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function OOBNotifier (id, controller) {
    // Call superconstructor first (AutomationModule)
    OOBNotifier.super_.call(this, id, controller);
}

inherits(OOBNotifier, AutomationModule);

_module = OOBNotifier;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

OOBNotifier.prototype.init = function (config) {
    OOBNotifier.super_.prototype.init.call(this, config);
    
    var self = this;
        this.tw_from = encodeURI(config.twilio_from);
        this.tw_to = encodeURI(config.twilio_to);
        this.tw_sid = config.twilio_sid;
        this.tw_at = config.twilio_authtoken;
        this.prefix = config.prefix;

    this.handler = function(){
        if(config.provider === 'twilio') {
            this.onNotificationHandler();
        } else {
            return;
        }
        
    };

    self.controller.on('notifications.push', this.handler);
    
};

OOBNotifier.prototype.stop = function () {
    OOBNotifier.super_.prototype.stop.call(this);
    
    var self = this;

    self.controller.off('notifications.push', this.handler);
    
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

OOBNotifier.prototype.onNotificationHandler = function () {
    var self = this;

    return function(notice) {
        http.request({
            method: 'POST',
            url: "https://api.twilio.com/2010-04-01/Accounts/"+ self.tw_sid +"/SMS/Messages",
            data: {
                From: self.tw_from,
                To: self.tw_to,
                Body: self.prefix + " " + notice.message
            }
        });
    };    
};