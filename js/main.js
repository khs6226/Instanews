$(function() {
    $('select').on('change', function() {
        const $section= ($('select').val());
        if($section !=="") {
        let $loader = $('.news img');
        $('header').css({"max-width": "600px", "height":"auto"});
        $('.logo img').css("width", "50%");
        $loader.css("display", "block");
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: `https://api.nytimes.com/svc/topstories/v2/${$section}.json?api-key=uLQ2Nlh2HBI6Z7CqiGTRYcG2SUqOC6IN`
        }).done(function(data) {
            $loader.hide();
            let $news = data.results;
            let $select = $news.filter(function(articles) {
                let $images = articles.multimedia.length;
                if ($images !== 0) {
                    let $a = $images;
                    return $a}
                }).slice(0,12);
            $('li:nth-child(n-13)').remove();
            $select.forEach(function(story) {
                $('.articles').append(
                    `<li>
                        <a href = "${story.url}" target="_blank">
                            <div class="image" style="background-image:url(${story.multimedia[4].url})">
                                <div class="story">
                                    <p>${story.abstract}</p>
                                </div>
                            </div>
                        </a>
                    </li>`
                );
            });
        }).fail(function() {
            $('.articles').append(`<p> Sorry something went wrong. Please refresh the page.</p>`)
        });
    }});
})