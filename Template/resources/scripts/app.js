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
        $('.createCenter, .createEvent').text('Create');
        $('.createCenter').click(() => {
            window.location = 'MyCenters.html';
        });
        $('.createEvent').click(() => {
            window.location = 'MyEvents.html';
        });
    });
    // implement functionality to load ManageEvent page when myEvents table row is clicked
    $('.event').click(() => {
        window.location = 'ManageEvent.html';
    });

    $('#edit').click(() => {
        $('.createEvent, .createCenter').text('Save');
        $('.createEvent, .createCenter').click(() => {
            $('#addNewEvent, #addNewCenter').modal('hide');
        });
    });
});