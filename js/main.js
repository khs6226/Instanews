$(function() {
    $('select').on('change', function() {
        const $section= ($('select').val());
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: `https://api.nytimes.com/svc/topstories/v2/${$section}.json?api-key=uLQ2Nlh2HBI6Z7CqiGTRYcG2SUqOC6IN`
        }).done(function(data) {
            console.log(data);
            $('.articles').append(`<li><a href = "${data.results[1].url}"><div class="image" style="background-image:url(${data.results[1].multimedia[4].url})"></div></a></li>`);
        });
    });
})