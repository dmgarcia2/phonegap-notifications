"use strict";

var watchID = null;

var application = {};

application.app = {

    initialize: function() {
        document.addEventListener('deviceready', application.app.onDeviceReady, false);
        
        $('body').bind("swiperight", function(event) {
            window.history.back();
        });

        $('body').bind("swipeleft", function(event) {
            window.history.forward();
        });
    },

    onDeviceReady: function() {
        StatusBar.hide();
		FastClick.attach(document.body);
    },
    
    showPhoneGapAlert: function(titulo, mensaje) {
        var titulo = $('#alert_title').val(),
            mensaje = $('#alert_text').val();

        navigator.notification.alert(mensaje, application.app.alertCallback, titulo, 'OK');
    },

    alertCallback: function() {
        // Método que se llamará cuando el usuario cierre la alerta mostrada
        $("#info_label").prepend("<li>Se ha cerrado una alerta.</li>");
        application.app.refreshList();
    },

    showPhoneGapConfirm: function() {
        var titulo = $('#alert_title').val(),
            mensaje = $('#alert_text').val();

        navigator.notification.confirm(mensaje, application.app.confirmation, titulo, ['Restart', 'Exit']);
    },
    
    confirmation: function(buttonIndex) {
        // Método que se ejecutará cuando el usuario seleccione
        // una de las opciones del diálogo de confirmación
        ("#info_label").prepend("<li>Se ha seleccionado la opci&oacute;n " + buttonIndex +
                                " del di&aacute;logo de confirmaci&oacute;n </li>");
        application.app.refreshList();
    },
    
    makePhoneGapBeep: function() {
        var beeps = parseInt($('#beep_times').val());
        
        navigator.notification.beep(beeps);
        $("#info_label").prepend("<li>Beep!Beep!</li>");
        application.app.refreshList();
    },

    makePhoneGapVibration: function() {
        var millis = parseInt($('#vibration_time').val());
        
        navigator.notification.vibrate(millis);
        $("#info_label").prepend("<li>Vibraci&oacute;n de " + millis + " ms.</li>");
        application.app.refreshList();
    },
    
    refreshList: function() {
        $("#info_label").listview('refresh');
    }

};
