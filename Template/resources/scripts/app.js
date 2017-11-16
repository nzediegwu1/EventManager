/// <reference path="jquery.js" />
/// <reference path="bootstrap.js" />
$(document).ready(() => {
    $('#accountType').change(() => {
        const value = $('#accountType').val();
        if (value === 'admin') {
            $('.paymentInput').show();
        } else {
            $('.paymentInput').hide();
        }
    });
});