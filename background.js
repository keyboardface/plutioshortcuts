
/************************* 
* 

***/
var item; // used for task & project tab select.
var wrapper;

function addToolTips()
{
    /* Not active yet. Needs an event that loads them */
    $('i.icon-text-bold').parent().attr('title','CTRL+B');
    $('i.icon-text-italic').parent().attr('title','CTRL+I');
    $('i.icon-text-underlined').parent().attr('title','CTRL+U');
    $('button:contains(H1)').attr('title','CTRL+1');
    $('button:contains(H2)').attr('title','CTRL+2');
    $('i.icon-text-list').parent().attr('title','CTRL+7');
    $('i.icon-text-ordered').parent().attr('title','CTRL+8');
    $('i.icon-text-quote').parent().attr('title','CTRL+9');
    $('i.icon-text-code').parent().attr('title','CTRL+0');
}
function initNav()
{

    if ($('.content .list-item').length>0)
    {
        // Initializing variables for tabbing through
        // are we on a list page or a task page.
        item='.content .list-item';
        wrapper='nothing'; // purposely to not select anything
    } else 
    {
        // we have to add focus to the wrapper so we can loop through the wrappers
        // as well as the tasks themselves. 
        // we need a wrapper
        item='.tasks-group-body div.task';
        wrapper='.tasks-group-wrapper';
        // end intializing variables for tabbing through
    }

    addToolTips();
}
function selectNext()
{
    if ($('.overlay-layer').length>0)
    {
        // if there's an overlay, don't do anything. You're on a task modal screen. 
        return;
    }

    if ($('.focus').length==0)
    {
        // if no item has focus, add focus to the first item (task or project)
        $(item).first().addClass('focus').parents(wrapper).addClass('focus');
        return;
    }

    if ($(item+'.focus').next(item).length==0)
    {
       // there isn't a "next" task
       if (wrapper=='nothing')
       {
            // if there isn't a wrapper on the page ( see initNav() ), disregard it and simply select first item 
            // this is for tabbing through projects on project index page.
            // add focus to the first item
            $(item).first().addClass('focus');
       }
        else
       {
            // if there is a wrapper
            // there are task groups to nav through.
            // but there isn't a next item, in this case, select the input so they can add a task. 
            // this is causing problems, however, so let's disable for the time being. 
           selectNextGroup('first');

           /* Code to select next input to add task. Disabled*/
            // $(item+'.focus').parents(wrapper).find('input').focus();                                    
            // $(item+'.focus').removeClass();
           
            // code to select next wrapper's item
            // $(item+'.focus').parents(wrapper).removeClass('focus').next(wrapper).addClass('focus');
            // $(wrapper+'.focus '+item).first().addClass('focus');                           
        }
    }
    else 
    {
        // if there is another task or item, remove it from that item and add it to the next
        item_focus = $(item+'.focus').first();
        $(item+'.focus').removeClass('focus');
        item_focus.next(item).addClass('focus');
        // $(item+'.focus').first().removeClass('focus').next(item).addClass('focus');   
    } 
}
function selectPrev()
{
    if ($('.overlay-layer').length>0)
    {
        // if there's an overlay, don't do anything. You're on a task modal screen. 
        return;
    }
    // Go backwards
    if ($(item).length>0)
    {
        // $(item+'.focus').removeClass('focus').prev(item).addClass('focus');
        if ($(item+'.focus').prev(item).length==0)
        {
            // there isn't another task in that wrapper
            if (wrapper !='nothing')
            {
            selectPrevGroup();
            $(wrapper+'.focus '+item).last().addClass('focus');
            }
        } else 
        {
            // if there is another task or item, remove it from that item and add it to the next
            $(item+'.focus').removeClass('focus').prev(item).addClass('focus');   
        } 

    }
}
function selectNextGroup(first='')
{
if ($('.overlay-layer').length>0)
{
    // if there's an overlay, don't do anything. You're on a task modal screen. 
    return;
}

 if ($('.focus').length==0)
    {
        // if no item has focus, add focus to the first item (task or project)
        selectNext();
        return;
    }   
   /* 
   if ($(item+'.focus').parents(wrapper).next(wrapper).length==0)
    {
        // if there is no next group, select first group.
        $(item+'.focus').parents(wrapper).removeClass('focus').first(wrapper).addClass('focus');
        $(item+'.focus').removeClass('focus');
        $(wrapper+'.focus '+item).first().addClass('focus'); 
    }
    */

    nth = $(item+'.focus').index()+1; 
    if (first=='first')
    {
        nth=0;    
    }

    $(item+'.focus').parents(wrapper).removeClass('focus').next(wrapper).addClass('focus');
    $(item+'.focus').removeClass('focus');
    
    if ($(wrapper+'.focus '+item+':nth-child('+nth+')').length>0)
    {
        // is there a list item at the same height as the current item
        $(wrapper+'.focus '+item+':nth-child('+nth+')').addClass('focus');
    } else
    {
        // if there isn't another item at the same height, select the first item.
        $(wrapper+'.focus '+item).first().addClass('focus'); 
    }

    return;  
}
function selectPrevGroup()
{
    if ($('.overlay-layer').length>0)
    {
        // if there's an overlay, don't do anything. You're on a task modal screen. 
        return;
    }

    $(item+'.focus').parents(wrapper).removeClass('focus').prev(wrapper).addClass('focus');
    $(item+'.focus').removeClass('focus').parents(wrapper).removeClass('focus');
}

function init() {

        $('body').keydown(function (e) 
        {

            initNav();
            console.log(item)

            if (e.keyCode==39)
            {
                //RIGHT ARROW
                // *** go to the next task group
                if (e.target.tagName=='INPUT') {
                    // $(e.target).blur();
                    return;
                }   

                if ($('.list-projects').length>0) 
                {
                    // if we're in cards view, select previous card instead of jumping wrappers. 
                    selectNext();
                    return;
                }                
                selectNextGroup();
            }             
            if (e.keyCode==37)
            {
                //LEFT ARROW
                // *** go to the next task group

                if (e.target.tagName=='INPUT') {
                    return;
                }
                if ($('.list-projects').length>0) 
                {
                    // if we're in cards view, select previous card instead of jumping wrappers. 
                    selectPrev();
                    return;
                }

                nth = $(item+'.focus').index()+1; 
                selectPrevGroup();

                if ($(wrapper+'.focus '+item+':nth-child('+nth+')').length>0)
                {
                    $(wrapper+'.focus '+item+':nth-child('+nth+')').addClass('focus');
                } else 
                {
                    $(wrapper+'.focus '+item).first().addClass('focus');
                }
            }

            if (e.keyCode==38)
            {
                //UP ARROW
                // *** go to the next task group
                if (e.target.tagName=='INPUT') {
                    return;
                }

                selectPrev();
            }             
            if (e.keyCode==40)
            {
                //DOWN ARROW
                // *** go to the next task group
                if (e.target.tagName=='INPUT') {
                    return;
                }
                selectNext();
            }            

            if (e.keyCode==9)
            {

             console.log('TAB');
                
             // if (e.target.tagName=='INPUT') 
             //    {
             //        // *** go to the next task group
             //        // on the Add Task 
             //        // code to select next wrapper's item
             //        // not currently being triggered for some reason. 
             //        console.log('on add task, selecting next wrapper');
             //        $(item+'.focus').parents(wrapper).removeClass('focus').next(wrapper).addClass('focus');
             //        $(item+'.focus').removeClass('focus');
             //        $(wrapper+'.focus '+item).first().addClass('focus'); 
             //        return;                              
             //    }

                //if in task-description, focus on comment.
                if ($(e.target).parents('.task-description').length>0)
                {
                    e.preventDefault();
                    console.log('task-description. Tab to comments');
                    $('.comment-input .public-DraftEditor-content').focus();
                    $('.comment-input .DraftEditor-root').addClass('focus');
                    $('.comment-input .public-DraftEditor-content').blur(function()
                        {
                           $('.comment-input .DraftEditor-root').removeClass('focus');
                        });  
                    return;                 
                }
                if ($('#task-page').length>0)
                {
                    console.log('on task page');
                    // we're on a task page, but not in the description, comment field or input
                    // select the first input
                    console.log(e.target.tagName);
                    console.log($(e.target).hasClass('public-DraftEditor-content'));
                    if (!(e.target.tagName=='INPUT' || $(e.target).hasClass('public-DraftEditor-content')))
                    {
                        console.log('focus on task title');
                        $('.task-title input').focus();
                    }
                }                    
            }
            if (e.keyCode==9 && $('.overlay-layer').length<=0)
            {
                // don't tab through items if a overlay is popped up.
                // keyCode 9 = tab
                
                /**** still needs to take into account empty next task group */
                if (e.shiftKey)
                {
                    // if shift+tab, go back up
                   selectPrev();
                } else
                {
                    if (e.target.tagName=='INPUT') {
                        return;
                    }

                    selectNext();          
                }

            }



            // console.log(e.KeyCode);  
            // If RTF Editing (Draft Editor)


            if (e.ctrlKey&& e.keyCode==67)
            {
                console.log('CTRL+C');
                // for whatever reason, without this blank if statement, it blocks the copy functionality when on comments.
                // succeed = document.execCommand("copy");
                console.log('success:'+succeed);
            } 
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode==66)
                {
                    console.log('ctrl+shift+b');
                    //ctrl+b
                    $('.tasks-board-actions .menu-links a').each(function() 
                    {
                        
                        if ($(this).text()=='Collapse'|| $(this).text()=='Expand')
                        {
                            $(this).addClass('task-toggle'); 
                            $(this).parent().parent().parent().parent().parent().parent().append(this);
                        }
                        // $('div.tasks-board-title').append(toggle);
                    });
                    
                             
                }
            if (e.keyCode==27) {
                // ESC Key

            }




            if ($(e.target).hasClass('public-DraftEditor-content'))
            {
            	// console.log('rtf editing');
            	// editing rtf

/*                if ($('#conversation-page').length==1)
                {
                    // on conversation page. 
                    if (e.keyCode==13) 
                    {
                        // disable single enter to submit comment and force CTRL+ENTER
                        e.preventDefault();
                        return;
                    }
                }*/
                // adding titles to show shortcuts needs to be added to the dom monitoring later. 
                // right now, it's just doing it with every click. not the best here. 
                if ($('.post-comment').length>0)
                {   
                    $('.post-comment').attr('title','Ctrl+Enter'); 
                }
                

                console.log('in rich text editor')

                if (e.keyCode==27) {
                    // ESC Key
                    console.log('Esc');
                    $(e.target).blur();
                }

                if (e.keyCode == 17) 
                {
                    //17 = ctrlkey
                    console.log('ctrl key adding hover to post-comment');
                    $('.comment-options-block button').addClass('hover');

                    return true;
                }

            	if ((e.ctrlKey || e.metaKey) && e.keyCode==66)
            	{
            		console.log('ctrl+b');
            		//ctrl+b
                    // $(e.target).parent().parent().next().find('.icon-text-bold').click(); disabled 5/5/2018

            		$(e.target).closest('.DraftEditor-root').parent().find('.icon-text-bold').click();
            	}
            	if ((e.ctrlKey || e.metaKey) && e.keyCode==85)
            	{
            		console.log('ctrl+u');
            		//ctrl+b
                    // $(e.target).parent().parent().next().find('.icon-text-underlined').click();
            		$(e.target).closest('.DraftEditor-root').parent().find('.icon-text-underlined').click();
            	}
            	if ((e.ctrlKey || e.metaKey) && e.keyCode==73)
            	{
            		console.log('ctrl+i');
            		//ctrl+b
            		$(e.target).closest('.DraftEditor-root').parent().find('.icon-text-italic').click();
            	}
            	if ((e.ctrlKey || e.metaKey) && e.keyCode==49)
            	{
            		console.log('ctrl+1');
            		//ctrl+b
            		$(e.target).closest('.DraftEditor-root').parent().find('button:contains(H1)').click();
            	}
            	if ((e.ctrlKey || e.metaKey) && e.keyCode==50)
            	{
            		console.log('ctrl+2');
            		//ctrl+b
            		$(e.target).closest('.DraftEditor-root').parent().find('button:contains(H2)').click();
            	}
            	if ((e.ctrlKey || e.metaKey) && e.keyCode==55)
            	{
            		console.log('ctrl+7');
            		//unordered list
            		$(e.target).closest('.DraftEditor-root').parent().find('.icon-text-list').click();
            	}
            	if ((e.ctrlKey || e.metaKey) && e.keyCode==56)
            	{
            		console.log('ctrl+8');
            		//numbered list
            		$(e.target).closest('.DraftEditor-root').parent().find('.icon-text-list-ordered').click();
            	}
            	if ((e.ctrlKey || e.metaKey) && e.keyCode==57)
            	{
            		console.log('ctrl+9');
            		//quote
            		$(e.target).closest('.DraftEditor-root').parent().find('.icon-text-quote').click();
            	}
            	if ((e.ctrlKey || e.metaKey) && e.keyCode==48)
            	{
            		console.log('ctrl+0');
            		//code
            		$(e.target).closest('.DraftEditor-root').parent().find('.icon-text-code').click();
            	}

            }  // // end if $(e.target).hasClass('public-DraftEditor-content')
            // moved down to allow the rte editor to blur on escape first. 
            
            
            // If you're adding a task or in the search box. 
            // Input 
            if (e.target.tagName=='INPUT') 
            {
                // clear focus 

                if ($('.focus').parents(wrapper).length>0) 
                {
                    // are we tabbing through tasks and is this an "Add Task" input. 
                    console.log('task page, removing class & selecting next wrapper');
                    $(wrapper+'.focus ').removeClass('focus').next(wrapper).addClass('focus');  
                    $('input.focus').removeClass('focus');
                    // $(item+'.focus').parents(wrapper).removeClass('focus').next(wrapper).addClass('focus');
                    $(wrapper+'.focus '+item).first().addClass('focus');  
                         
                } else
                {
                    console.log('removing class focus');
                    // we're on any other page and are tabbing away from an input.
                    $('.focus').removeClass('focus');                    
                }

                //.has-inner-icon
                 console.log($(e.target).attr('name'));
                console.log('keydown on input');

                 if ($('.popup-body.filters').length>0)
                {
                    // we're in the filters area now. 
                    // not working yet.
                    if (e.keyCode==13) 
                    {
                       console.log($(e.target).parent());
                       console.log('open next dropdown');
                       $('.Select-control').last()[0].click();
                    }
                }
                if (e.keyCode==27)
                {
                    // ESC key

                    if ($('.overlay-layer').length>0)
                    {
                        // if there's an overlay, You're on a task modal screen - do closeoverlay and don't clear filters, etc.
                        closeOverlay(e);
                        return;
                    }
                    
                    
                    // you're not on an overlay screen and ESC was pressed. Clear or blur the search box.
                    e.preventDefault();
                    e.stopPropagation();

                    console.log('esc key');
                

                    if ($('.Select.is-open').length>1) 
                    {
                        console.log('.Select.is-open');
                        $(e.target).blur();
                        // is a select drop down open. If so just blur it.
                        // click the top right-hand corner of the screen.
                        // there is no blur option because it's not an actual select form control. 
                        //document.elementFromPoint($(document).width(), 1).click();   
                        return;
                    }
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
                    return;
                }
                if (e.keyCode==13 & lastKey=='Enter')
                {
                    // enter twice to open top project. 

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
                    // if in a filter select next one.
                   
                    if ($(e.target).attr('name')=='title' && $('.page-overlay').length>0)
                    {
                        // if we're editing the title of a task at the top of a modal dialog
                        // you have to have the page-overlay added, however, otherwise it prevents adding new tasks.
                        // blur on enter.
                        // this doesn't appear to work at the moment. 5/2/2018

                        $(e.target).removeClass('focus');
                        $(e.target).blur();
                    }
                    lastKey='Enter';
                } else {
                    lastKey='';
                }
                    
            }
            // Escape Key anywhere
            if (e.keyCode==27)
                {
                    closeOverlay(e);
                }
            
            // If you're not adding a task, and you're not editing the description.
            // Basically, if you're anywhere on the site. 
            // this is for g, p go to projects, etc. 
            
            if (e.target.tagName!='TEXTAREA' && e.target.tagName!='INPUT' && !$(e.target).hasClass('public-DraftEditor-content')) {
                e.preventDefault();
                if (e.keyCode==13)
                {
                    // enter
                    console.log('Enter, open list item');
                    if ($('.focus').length>0)
                    {
                        console.log('click');
                        $(item + '.focus a')[0].click();
                    }
                }
                if (e.keyCode==83||e.keyCode==191) 
                {
                    console.log('keydown: s or /');
                    //"s" 's' for search
                    // or "/" to copy Gmail's search shortcut.

                    $('.focus').removeClass('focus');

                    if ( $('.page-utilities').first().hasClass('opened') ) 
                    {
                        // open the toggle area if not open.
                        
                        // $('.has-inner-icon').first().focus().select(); deprecated
                        $('.utilities-block form input').first().focus().select();
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
                    if ($('.filter-option-add').length>0)
                    {
                        //let the magic begin...
                        jQuery('.filter-option-add .icon-add').first().click();
                    }
                }
                
                if (e.keyCode==27)
                {
                    console.log('Keydown: ESC');
                    // escape key
                    // if on projects screen, clear the filter 
                    $('.focus').removeClass('focus');
                    if ($('a.clear-button').length>0) 
                    {
                        $('a.clear-button')[0].click();
                    } else {
                        if ($('form input[placeholder=Search]').first().val()=='' && $('form input[placeholder=Search]').first().is(":focus")) 
                        {
                            $('form input[placeholder=Search]').first().blur();
                        } else {
                            $('form input[placeholder=Search]').first().focus().select();
                        }

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
            
            if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.keyCode == 13) 
            {
            // shift and ctrlKey and Enter
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
        
            if ((e.ctrlKey || e.metaKey) && e.keyCode == 13) 
            {
            // ctrlKey and Enter
            // not working yet. Testing needed to get button click to work. 
            e.preventDefault();
            if ($('.comment-options-block button').length>0) 
                {
                $('.comment-options-block button')[0].click();
                $('.comment-input-block public-DraftEditor-content').html('');
                }
            return false;
            }

        
            
        }
    );
    
    $('body').keyup(function (e) 
        {
            $('.comment-options-block button').removeClass('hover');
        }
    );
    

    
    $('body').dblclick(function(e) {
        // console.log(e.target);
        // you can't attach the click event to the container directly because it's lazy loaded.
        container = $(e.target).closest('.comment-container');
        if (container.length=1) {
            if ($('a.edit-button').length>0) 
            {
                if ($(container).find('a.edit-button').first().text()=='Edit')
                {
                    $(container).find('a.edit-button')[0].click();  
                }
            }
        }
    });



    $('body').click(function(e) {
        
        if ($(e.target).hasClass('task-checkbox')) {
            e.preventDefault();
            $(e.target).find('label.checkbox').click();
            return false;
        }
        if ($(e.target).hasClass('checkbox-toggle'))
        {
            // if the span.checkbox-toggle is clicked, find the actual label 
            // and click that to trigger the fast check. 
            // span.checkbox-toggle has a higher z-index.
            e.preventDefault();
            $(e.target).closest('label.checkbox').click();
            return false;
        }

        if ($(e.target).hasClass('icon-cross'))
        {
            // icon-cross
            // closing overlay. 
            // check for comments. 
            closeOverlay(e);
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

    // init();


}

var lastKey;


init();


function closeOverlay(e) 
{

    

    console.log('closeOverlay(e)');
    if ($('.focus').length>0)
    {
        $('.focus').removeClass('focus');
        return;
    }
    
    if ($('.comment-edit-button').length>0)
    {
        // if you're editing a comment. 
        if ($('.comment-edit-button').text()=='CancelEditEditEditEditEdit')
        {
            e.preventDefault();
            e.stopPropagation();
            
            $('.comment-edit-button')[0].click();
        
            return false;
        }
    }
    // ESC key, check for if saving... 
    if ($('.comment-options-block button').length>0)
    {
       close = confirm('Are you sure? The comment will be lost');
       console.log(close);
       if (!close)
       {

         e.preventDefault();
        e.stopPropagation();
        return false;
       } 

    }

    console.log('about to check if still saving');
    console.log($('.saving').length);
    if ($('.saving').length>0)
    {
        // need to show a message here. 
        e.preventDefault();
        e.stopPropagation(); 
        
        console.log('still saving... please wait');

        $('.page-overlay-navigation').after('<div class="error-message">Saving in Progress... Trying again in a second.</div>').delay(1000).fadeOut();
        
/*        window.setTimeout(
            function() 
            {
                if ($('.page-overlay-navigation a').length>0)
                {
                    $('.page-overlay-navigation a')[0].click(),1000);        
                }
            }, 1000);*/

        // $('.save-state').bind("DOMSubtreeModified",function()
        // {
        //     // monitor save-state. When changed, close the window.
        //     // because it's automatically closing, we can possibly get rid of this notification message.
        //     if ($('.saving').length==0) {
        //          $('.error-message').remove();
        //         // not working. also needs a monitor for if the content of the rtf editor changes
        //         // we need to have something to monitor this because it doesn't always trigger the "saving". 
        //         // sometimes it just waits and then randomly says saved. 
                
        //         /*var press = jQuery.Event("keypress");
        //         press.ctrlKey = false;
        //         press.which = 27;
        //         $(document).trigger(press);*/
        //     }
        // });
        
        return false;
    }

    /* File Attachments */
  

/*    if ($('.preview-attachments').length>0)
    {
        //if you're on a attachments preview, x out of the preview.
        e.preventDefault();
        e.stopPropagation(); 
        $('.preview-attachments .close-button a')[0].click();
         return false;
    }*/
    /*Previewing*/
    if ($('.preview-attachments .close-button a').length > 0)
    {
        e.preventDefault();
        e.stopPropagation(); 
        $('.preview-attachments .close-button a')[0].click();
        return false;
    }
    /* Sub Tasks */
    if ($('#task-page .back-button').length>0)
    {
        //if you're on a sub task page, hit the back button, don't close the window.
        e.preventDefault();
        e.stopPropagation(); 
        $('#task-page .back-button')[0].click();
         return false;
    }

    /* Notification Indicator */
    if ($('.notifications-indicator-close').length>0)
    {
        //if you're on a sub task page, hit the back button, don't close the window.
        e.preventDefault();
        e.stopPropagation(); 
        $('.notifications-indicator-close')[0].click();
         return false;
    }


    

}

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

