
/************************* 
* 

***/

function init() {

        $('body').keydown(function (e) 
        {
            if ($(e.target).hasClass('public-DraftEditor-content'))
            {
            	console.log('rtf editing');
            	// editing rtf
            	if (e.ctrlKey && e.keyCode==66)
            	{
            		console.log('ctrl+b');
            		//ctrl+b
            		$(e.target).parent().parent().next().find('.icon-text-bold').click();
            	}
            	if (e.ctrlKey && e.keyCode==85)
            	{
            		console.log('ctrl+u');
            		//ctrl+b
            		$(e.target).parent().parent().next().find('.icon-text-underlined').click();
            	}
            	if (e.ctrlKey && e.keyCode==73)
            	{
            		console.log('ctrl+i');
            		//ctrl+b
            		$(e.target).parent().parent().next().find('.icon-text-italic').click();
            	}
            	if (e.ctrlKey && e.keyCode==49)
            	{
            		console.log('ctrl+1');
            		//ctrl+b
            		$(e.target).parent().parent().next().find('button:contains(H1)').click();
            	}
            	if (e.ctrlKey && e.keyCode==50)
            	{
            		console.log('ctrl+2');
            		//ctrl+b
            		$(e.target).parent().parent().next().find('button:contains(H2)').click();
            	}
            	if (e.ctrlKey && e.keyCode==55)
            	{
            		console.log('ctrl+7');
            		//unordered list
            		$(e.target).parent().parent().next().find('.icon-text-list').click();
            	}
            	if (e.ctrlKey && e.keyCode==56)
            	{
            		console.log('ctrl+8');
            		//numbered list
            		$(e.target).parent().parent().next().find('.icon-text-list-ordered').click();
            	}
            	if (e.ctrlKey && e.keyCode==57)
            	{
            		console.log('ctrl+9');
            		//quote
            		$(e.target).parent().parent().next().find('.icon-text-quote').click();
            	}
            	if (e.ctrlKey && e.keyCode==48)
            	{
            		console.log('ctrl+0');
            		//code
            		$(e.target).parent().parent().next().find('.icon-text-code').click();
            	}
            }
            if (e.target.tagName=='INPUT') {
                //.has-inner-icon
                console.log('keydown on input');
                if (e.keyCode==27)
                {
                    // ESC key
                    console.log('esc key');
                    if ($('a.clear-button').length>0) 
                    {
                        $('a.clear-button')[0].click();
                    }
                    if ($(e.target).val()=='')
                    {
                        //esc
                        if (e.keyCode==27)
                        {
                            $(e.target).blur();
                        }
                    }
                    /*console.log($(e.target).next());
                    console.log($(e.target).next().hasClass('clear-button'));
                        $(e.target).next().click();
                    if (($(e.target).next().hasClass('clear-button')))
                    {
                        $(e.target).next().click();
                    }*/
                }
                if (e.keyCode==13 & lastKey=='Enter')
                {
					o = $('.list-section').first().offset();
                    document.elementFromPoint(o.left+20, o.top+20).click();   
                }
                if (e.keyCode==13)
                {
                    //Enter
                    //subtask Enter
                    //$(e.target).clone().addClass('dupe').appendTo(e.target);
                    //clearing the input doesn't work. meteor is weird.
                    //list-section
                    lastKey='Enter';
                }
                    
            }
            
            
            if (e.target.tagName!='INPUT' && !$(e.target).hasClass('public-DraftEditor-content')) {
                e.preventDefault();
                
                if (e.keyCode==83) 
                {
                    console.log('keydown: s');
                    //s for search
                    
                    if ( $('#page-utilities').first().hasClass('opened') ) 
                    {
                        // open the toggle area if not open.
                        
                        $('.has-inner-icon').first().focus().select();
                        
                    } else {
                        //console.log($('.page-utilities').html());
                        if ($('a.utilities-toggle').length>0) {
                            $('a.utilities-toggle span').first().click();
                        }
                    }
                    //search box. 
                
                    return false;
                }
                if (e.keyCode==70) 
                {
                    //f for filter 
                    console.log('Keydown: F');
                    if ($('.input-placeholder').length>0 && $('.page-overlay').length==0) 
                    {
                            $('.input-placeholder')[0].click(); 
                    }
                }
                
                if (e.keyCode==27)
                {
                    console.log('Keydown: ESC');
                    // escape key
                    // if on projects screen, clear the filter 
                    if ($('a.clear-button').length>0) 
                    {
                        $('a.clear-button')[0].click();
                    }
                }

                if (e.keyCode==80 && lastKey=='g')
                {
                    // p key
                    lastKey='p';
                    o = $('a[href="/projects"]').offset();

                    document.elementFromPoint(o.left+10, o.top+10).click();
                    // clicking the link itself doesn't work. Doesn't trigger meteor's document click handler
                    // document location goes through a long page load. 

                    // $('a[href=/projects]').first().click();
                    // document.location.replace("/projects");
                }
                if (e.keyCode==84 && lastKey=='g')
                {
                    //t key
                    // href="/tasks"
                    lastKey='t';
                    o = $('a[href="/tasks"]').offset();
                    document.elementFromPoint(o.left+10, o.top+10).click();
                    // $('a[href=/tasks]').first().click();
                    // document.location.replace("/tasks");
                }
                if (e.keyCode==73 && lastKey=='g')
                {
                    // i key
                    // href="/inbox"
                    lastKey='i'
                    o = $('a[href="/invoices"]').offset();
                    document.elementFromPoint(o.left+10, o.top+10).click();
                    // $('a[href=/conversations]').first().click();
                    // document.location.replace("/conversations");
                }
                if (e.keyCode==67 && lastKey=='g')
                {
                    // c key
                    // href="/calendar"
                    lastKey='i'
                    o = $('a[href="/calendar"]').offset();
                    document.elementFromPoint(o.left+10, o.top+10).click();
                    // $('a[href=/conversations]').first().click();
                    // document.location.replace("/conversations");
                }
                if (e.keyCode===71)
                {
                    // g key 
                    lastKey='g';
                }
            }
            
            if (e.shiftKey && e.ctrlKey && e.keyCode == 13) 
            {
            // ctrlKey and Enter
            e.preventDefault();
            $('#task-page>.task-head>.task-checkbox label')[0].click();
            if ($('a.back-button').length>0)
            {
                $('a.back-button')[0].click();
            } else 
            {
                $('.page-overlay-close a')[0].click();
            }

            return false;
            }
        
            if (e.ctrlKey && e.keyCode == 13) 
            {
            // ctrlKey and Enter
            e.preventDefault();
            if ($('.post-comment').length>0) 
                {
                $('.post-comment')[0].click();
                }
            return false;
            }

            if (e.keyCode == 17) 
            {
                //17 = ctrlkey
                $('.post-comment').addClass('hover');
            }
        
            
        }
    );
    
    $('body').keyup(function (e) 
        {
            $('.post-comment').removeClass('hover');
        }
    );
    

    
    $('body').dblclick(function(e) {
        // you can't attach the click event to the container directly because it's lazy loaded.
        container = $(e.target).parents('.comment-container');
        if (container.length=1) {
            if ($('a.comment-edit-button').length>0) 
            {
                $(container).find('a.comment-edit-button')[0].click();  
            }
        }
    });



    $('body').click(function(e) {
        
        if ($(e.target).hasClass('task-checkbox')) {
            e.preventDefault();
            $(e.target).find('label.checkbox').click();
            return false;
        }

        if ($(e.target).hasClass('checkbox')) {
            //label.checkbox
            delay = 1000; // 1 second delay. 
            // maybe used 
            // classCompleted = $(e.target.getElementsByTagName('input')[0]).hasClass('checked');
            classCompleted = $(e.target.getElementsByTagName('input')[0]).hasClass('checked');

            parentCompleted = $(e.target).parents('.completed').length
            if (classCompleted || parentCompleted) 
            {
                $(e.target).find('input').removeClass('checked');
                $(e.target).find('input').addClass('off')
                
                window.setTimeout(function()
                    {
                    $(e.target).find('input').removeClass("off");
                    }, delay);

                // needs a delay to remove the class off so that other people checking it off in meteor 
                // has it sync.

            } else 
            {
                $(e.target).find('input').addClass('checked');
                $(e.target).find('input').removeClass('off');
                
                window.setTimeout(function()
                    {
                    $(e.target).find('input').removeClass("checked");
                    }, delay);              
            }
            //$(e.target).children('input')[0].addClass('checked');
                /*if (!$(this).parents('a.task-link').hasClass('completed')) 
                {
                    console.log('hasclass');
                    $(this).children('input').addClass('checked');
                } else {
                    console.log('unchecking box');
                    $(this).children('input').removeClass('checked');
                }*/
        }
    
    });
    



    interval = 2000;
    limit = 10;
    
    // add a fixed link to a project 
    // disabled for public release.
    // setTimeout(function() {
    //     insertHTML(0);
    // }, interval);
    
    
    function insertHTML(counter) 
    {
        if (counter>limit) {
            console.log("counter:"+counter+", limit:"+limit);
            console.log('Took too long, aborting check');
            return;
        }   
        if ($('.menu-list').length>0) 
        {
            console.log('menu is loaded');
            $('.menu-list a[href="/projects"]').after('<a href=/projects/internal-quotes/tasks><i class="icon-briefcase"></i><p>Quotes</p></a>');       
        } else 
        {
            console.log('.menu-list not there, waiting ' + interval);
            setTimeout(insertHTML(counter+1),interval);
        }

    }

}

var lastKey;

init();
// site = jQuery.grep(sites, function (s) { return s.uri == "cnn.com" });
// site = sites.filter(function (s) { return s.uri == "storyjumper.com" });



// Listen to message from content script
// not used.
/*chrome.runtime.onMessage.addListener(
    function listen_to_content(obj, sender, sendResponse) {


        console.log(window.location+': background.js: '+obj.action);
        console.log(obj);
       
        switch(obj.action) 
        {
            case "color_page":
                color_page(default_colors);
                break;

        }

        sendResponse({farewell: "From background: I got the object."});
  });*/

