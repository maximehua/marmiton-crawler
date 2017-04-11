Template.layout.helpers({
    recipe: function(){
        return Recipes.find({}, { sort: { createdAt: -1 } });
    }
});
