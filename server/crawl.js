
Meteor.startup(function () {
    console.log("started");

    var Crawler = require('crawler');

    var c = new Crawler({
        rateLimit: 30000,
        maxConnections: 1,
        skipDuplicates : true,
        jQuery: {
            name: 'cheerio',
            options: {
                normalizeWhitespace: true,
            }
        },
        callback: Meteor.bindEnvironment(function(error, res, done) {
            if(error) {
                console.log(error);
            }
            else if (res.request.uri.href.search("recettes") >= 0) {

                console.log("c'est une recette");

                var url = res.request.uri.href;
                let $ = res.$;
                var recette = {};

                recette['name'] = $(".m_title .item span").text();
                recette['illu'] = $(".m_content_recette_illu img").attr("src");
                recette['url'] = url;
                recette['durees'] = {
                    preparation : $(".m_content_recette_info .preptime").text().trim(),
                    cuisson : $(".m_content_recette_info .cooktime").text().trim()
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
                recette['ingredients'] = recette['ingredients'].filter(String);

                recette['recette'] = $(".m_content_recette_todo").text().trim();

                Meteor.call("update",recette);

                var listLinks = $('a').toArray();
                var queue = [];

                _.each(listLinks, function(element){
                    if ( typeof element.attribs.href !== 'undefined') {
                        if (element.attribs.href.search("org/recettes/recette") >= 0 ) {
                            queue.push(element.attribs.href);
                        }
                    }
                });

                c.queue(queue)
            }
            else {
                console.log("ce n'est pas une recette");
            }
            done();
        })
    })

    c.queue([
        'http://www.marmiton.org/recettes/recette_tarte-tatin-a-la-papaye_30690.aspx'
        ])
});


Meteor.methods({
    update : function(recette){

        Recipes.update(
            { url: recette.url},
            { $set: recette},
            { upsert : true,}
            );

    },
})
