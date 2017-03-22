Meteor.startup(function () {
    console.log("started");

});


Meteor.methods({
    parse : function( func, param ){

            let cheerio = require('cheerio');
            HTTP.get( 'http://www.marmiton.org/recettes/recette_quiche-lorraine_30283.aspx', function( error, response ) {
                if ( !error ) {
                    var html = response.content;
                    let $ = cheerio.load(html);

                    var recette = {};

                    // For each .item, we add all the structure of a company to the companiesList array
                    // Don't try to understand what follows because we will do it differently.
                        recette['name'] = $(".m_title").text();
                        console.log(recette['name']);
                        recette['description'] = $(".m_content_recette_ingredients").text();
                        console.log(recette['description']);

                        console.log(recette); // Output the data in the terminal

                }
                else {
                    console.log(error);
                }
            });
        },
})
