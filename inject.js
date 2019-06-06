$(document).ready(function(){
    var checkExist = setInterval(function() {
        if ($('ad-top-menu-options [ng-click^="controller.openMyPreferences()"]').length) {
            clearInterval(checkExist);
            // add the Extension button when the menu exists 
            AddExtensionMenuButton()
        }
    }, 100); 
})

// add click to Extensions button to load up the page 
function AddExtensionMenuButton() {
    // create the Extensions menu item
    $('ad-top-menu-options [ng-click^="controller.openMyPreferences()"]').after('<div class="ads-menu-item" id="exts"><div>Extensions</div></div>')
    $('#exts').on('click',function () {
        if (window.location.href.indexOf('SETTINGS_USER_PREFERENCES') > 0) ExtensionsClick()
        else {
            $('.ads-right-side-content-container').hide()
            angular.element($('ad-top-menu-options [ng-click^="controller.openMyPreferences()"]')).scope().controller.openMyPreferences()
            var checkExist = setInterval(function() {
                if ($('form[name^="userAccountForm"]').length) {
                    clearInterval(checkExist);
                    $('.ads-right-side-content-container').show()
                    ExtensionsClick()
                }
            }, 100);
        }
    })
}

// click bring up the Extensions page
function ExtensionsClick() {
    // add the tabs and main container
    $('ad-view-stack').html('<div class="ads-user-preferences-container extensionspage" style="top: 47px;height: 100%;width: 100%;"><ad-tab-row><div class="adsDashboardRowTabs adsTabRowLevel2"></div></ad-tab-row><div class="ads-user-preferences-main-content-container ads-border-top" style="position: relative;height: 100%;"></div></div>')
    // trigger the 'all-ready' event
    $(window).trigger(Extn);
}
    
// Event for adding Extensions to the Extensions page
function ExtensionTabClick(){$(this).addClass('selected').siblings().removeClass('selected'); $('.extensionspage .group-view').hide(); $('#'+$(this).attr('tabname')).show()}

// function for adding Extension tabs
function addExtTab(name, id){
        $('.adsTabRowLevel2').append('<div class="adsTabLevel1" tabname="'+id+'">'+name+'</div>');
        $('.adsTabRowLevel2 [tabname^='+id+']').on('click',ExtensionTabClick);
        $('.ads-user-preferences-main-content-container').append('<div name="'+id+'" class="group-view" id="'+id+'" style="display: none;"><h2 class="ads-card-title" style="margin:10px">'+name+'</h2></div>');
        $('.adsTabRowLevel2:first').click();
        return $('#'+id)
};

// create the all-ready event for loading 
var Extn = $.Event('ExtLoad')

// test Extensions
$(window).on('ExtLoad', function (e) {
    addExtTab("Extension 1","extension1").append('<table name="accountInfo" class="sty-form-table"><tr><td>category1</td><td>entry1</td></tr><tr><td>category2</td><td>entry2</td></tr></table>')
    addExtTab("Extension 2","extension2").append('<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>');
    addExtTab("Extension 3","extension3").append('<div>hello</div>');
});


