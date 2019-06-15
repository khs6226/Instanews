$(function() {
    $('select').on('change', function() {
        const $section= ($('select').val());
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: `https://api.nytimes.com/svc/topstories/v2/${$section}.json?api-key=uLQ2Nlh2HBI6Z7CqiGTRYcG2SUqOC6IN`
        }).done(function(data) {
            let news = data.results;
            let select = news.filter(function(articles) {return articles.multimedia.length !==0}).slice(0,12);
            $('li:nth-child(n-13)').remove();
            select.forEach(function(story, index) {
                $('.articles').append(`<li><a href = "${data.results[index].url}"><div class="image" style="background-image:url(${data.results[index].multimedia[4].url})"></div></a></li>`);
            });
        });
    });
})