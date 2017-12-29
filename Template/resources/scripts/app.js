/// <reference path="jquery.js" />
/// <reference path="bootstrap.js" />
$(document).ready(() => {
    $('#deleteEvent').click(() => {
        const sure = confirm('Are you sure you want to delete Event?');
        if (sure) {
            alert('Event Deleted');
            window.location = 'MyEvents.html';
        }
    });
    $('#deleteCenter').click(() => {
        const sure = confirm('Are you sure you want to delete Center?');
        if (sure) {
            alert('Center Deleted');
            window.location = 'MyCenters.html';
        }
    });

    $('#addEvent').click(() => {
        $('.createEvent').text('Create');
        $('#addNewEventTitle').text('Add Event');
        $('.createEvent').click(() => {
            alert('Successfully created!');
            window.location = 'MyEvents.html';
        });
    });
    $('#addCenter').click(() => {
        $('.createCenter').text('Create');
        $('#addNewCenterTitle').text('Add Center');
        $('.createCenter').click(() => {
            alert('Successfully created!');
            window.location = 'MyCenters.html';
        });
    });

    $('.event').click(() => {
        window.location = 'ManageEvent.html';
    });
    $('.center').click(() => {
        window.location = 'CenterDetails.html';
    });

    $('#editEvent').click(() => {
        $('.createEvent').text('Save');
        $('#addNewEventTitle').text('Modify Event');
        $('.createEvent').click(() => {
            $('#addNewEvent').modal('hide');
        });
    });
    $('#editCenter').click(() => {
        $('.createCenter').text('Save');
        $('#addNewCenterTitle').text('Modify Center');
        $('.createCenter').click(() => {
            $('#addNewCenter').modal('hide');
        });
    });
});