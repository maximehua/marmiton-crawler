Meteor.startup(function () {
    console.log("started");

});


Meteor.methods({
    scrape : function( url ){

        let cheerio = require('cheerio');

        HTTP.get( url, function( error, response ) {

            if ( !error && response.statusCode===200 ) {
                var html = response.content;
                let $ = cheerio.load(html,{
                    normalizeWhitespace: true,
                    // xmlMode: true
                });

                var recette = {};

                    recette['name'] = $(".m_title .item span").text();
                    recette['illu'] = $(".m_content_recette_illu img").attr("src");
                    recette['url'] = url;
                    recette['durees'] = {
                        preparation : $(".m_content_recette_info .preptime").text(),
                        cuisson : $(".m_content_recette_info .cooktime").text()
                    };

                    var tags = $(".m_bloc_cadre>.m_content_recette_breadcrumb").text();
                    recette['tags'] = tags.split(" - ");
                    _.each(recette['tags'], function(element,index){
                        recette['tags'][index] = element.trim();
                    });


                    recette['note'] = 0;
                    _.each($(".m_content_recette_note img"), function(element){
                        if (element.attribs.class==="on") {recette['note']++}
                    });

                    $(".m_content_recette_ingredients span").remove();
                    recette['ingredients'] = $(".m_content_recette_ingredients").text().trim();
                    recette['ingredients'] = recette['ingredients'].split("-");

                    _.each(recette['ingredients'], function(element,index){
                        recette['ingredients'][index] = element.trim();
                        if (recette['ingredients'][index] === "") {
                            delete recette['ingredients'][index];
                        }
                    });

                    recette['recette'] = $(".m_content_recette_todo").text();

                    console.log(recette);


                    }
                    else {
                        console.log(error);
                    }
                });
    },
})
