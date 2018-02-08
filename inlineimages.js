    $('html').bind("DOMAttrModified", function() {
        //deprecated. use MutationObserver now. 
        // https://blog.sessionstack.com/how-to-track-changes-in-the-dom-using-mutation-observer-bafdac65bca5
        //inlineImages();
    });

var mo = new MutationObserver(function(mutations) {
	console.log('heres looking at you bub');
    mutations.forEach(function(mutation) {
	console.log('each');
        console.log(mutation);
    });
});
mo.observe(document.getElementsByTagName('html')[0], {
    attributes: true,
    characterData: false,
    childList: false,
    subtree: false,
    attributeOldValue: true,
    characterDataOldValue: false
});

// when opening, the first mo will have an old value of "" and the second will have some random stlye attribute. 

// So, the if the first value is "" wait 500 milliseconds we need to monitor the comments thread to see when it's done loading too. 

function inlineImages()
{
    console.log('inline-image');

    $('.DraftEditor-editorContainer').each(function() {
        console.log('DraftEditor-editorContainer');
        $(this).contents().find('a').each(function() {
            console.log('each a');
            var filename=$(this).text();
            var ext = filename.split('.').pop();
            if (ext=='jpg')
            {
                $(this).append('<img class="inline-image" src="'+filename+'" />');
            }
        });
    });  
}