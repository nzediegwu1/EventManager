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
    $('#deleteEvent').click(() => {
        const sure = confirm('Are you sure to delete event?');
        if (sure) {
            alert('Event Deleted');
            window.location = 'MyEvents.html';
        }
    });
    $('#addEvent, #addCenter').click(() => {
        $('.createEvent, .createCenter').text('Create');
        $('.createEvent, .createCenter').click(() => {
            window.location = 'MyCenters.html';
        });
    });
    // implement functionality to load ManageEvent page when myEvents table row is clicked
    $('#editEvent').click(() => {
        $('.createEvent, .createCenter').text('Save');
        $('.createEvent, .createCenter').unbind();
        // on click of .createEvent and .createCenter: close modal
    });
});