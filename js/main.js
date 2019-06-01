$(function() {
    $("select").on("change", function() {
        $section = ($('select').val());
        $.ajax({
            method: "GET",
            dataType: "json",
            url: `https://api.nytimes.com/svc/topstories/v2/${$section}.json?api-key=uLQ2Nlh2HBI6Z7CqiGTRYcG2SUqOC6IN`
        }).done(function(data) {
            console.log(data);
        });
    });
})