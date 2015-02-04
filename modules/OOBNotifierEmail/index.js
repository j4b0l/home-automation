/*** OOBNotifierEmail Z-Way HA module *******************************************

Version: 1.0.0
(c) Z-Wave.Me, 2014
-----------------------------------------------------------------------------
Author: Niels Roche <nir@zwave.me>
Description:
    This module allows you to send notifications via email.

******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function OOBNotifierEmail (id, controller) {
    // Call superconstructor first (AutomationModule)
    OOBNotifierEmail.super_.call(this, id, controller);
}

inherits(OOBNotifierEmail, AutomationModule);

_module = OOBNotifierEmail;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

OOBNotifierEmail.prototype.init = function (config) {
    OOBNotifierEmail.super_.prototype.init.call(this, config);
    
    var self = this;
    this.to = config.mail_to;
    this.name = config.target_name;
    this.subject = config.mail_subject;

    this.handler = this.onNotificationHandler();

    self.controller.on('notifications.push', this.handler);
    
};

OOBNotifierEmail.prototype.stop = function () {
    OOBNotifierEmail.super_.prototype.stop.call(this);
    
    var self = this;

    self.controller.off('notifications.push', this.handler);
    
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

OOBNotifierEmail.prototype.onNotificationHandler = function () {
    var self = this;

    return function(notice) {
        http.request({
            method: 'POST',
            url: "http://192.168.10.200/nr/email_notifier.php",
            data: {
                from_adr: "nir@zwave.eu",
                our_company: "Z-Wave Europe GmbH",
                mail_target: self.to,
                target_name: self.name,
                subject: self.subject,
                alt_body: "",
                content: notice.message
            }
        });
    };    
};