import $ from 'jquery';

// Note MLO : version 2.3.0

module.exports = {

    initApplication() {
        this.options = {
            enableControlSidebar: true,
            navbarMenuSlimscroll: true,
            navbarMenuHeight: '200px',
            navbarMenuSlimscrollWidth: '3px',
            animationSpeed: 500,
            // attention correspondance JS / CSS
            cssAnimationSpeed: 200,
            sidebarPushMenu: true,
            sidebarToggleSelector: "[data-toggle='offcanvas']",
            sidebarExpandOnHover: false,
            enableBSToppltip: true,
            controlSidebarOptions: {
                //Which button should trigger the open/close event
                toggleBtnSelector: "[data-toggle='control-sidebar']",
                //The sidebar selector
                selector: ".control-sidebar",
                //Enable slide over content
                slide: true
            },
            //The standard screen sizes that bootstrap uses.
            //If you change these in the variables.less file, change
            //them here too.
            screenSizes: {
                xs: 480,
                sm: 768,
                md: 992,
                lg: 1200
            },
        }
        this._init();

        //Activate the layout maker
        this.layout.activate();

        //Enable sidebar tree view controls
        this.tree('.sidebar');

        //Enable control sidebar
        // if (this.options.enableControlSidebar) {
        //     this.controlSidebar.activate();
        // }

        //Add slimscroll to navbar dropdown
        if (this.options.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
            $(".navbar .menu").slimscroll({
                height: this.options.navbarMenuHeight,
                alwaysVisible: false,
                size: this.options.navbarMenuSlimscrollWidth
            }).css("width", "100%");
        }

        //Activate sidebar push menu
        if (this.options.sidebarPushMenu) {
            this.pushMenu.activate(this.options.sidebarToggleSelector);
        }

        //Activate Bootstrap tooltip
        // if (this.options.enableBSToppltip) {
        //     $('body').tooltip({
        //         selector: o.BSTooltipSelector
        //     });
        // }

        //Activate fast click
        // if (o.enableFastclick && typeof FastClick != 'undefined') {
        //     FastClick.attach(document.body);
        // }

        $('.btn-group[data-toggle="btn-toggle"]').each(() => {
            var group = $(this);
            $(this).find(".btn").on('click', function (e) {
                group.find(".btn.active").removeClass("active");
                $(this).addClass("active");
                e.preventDefault();
            });

        });

    },

    _init() {
        $("body").removeClass("hold-transition");
        let adminlte = this;
        this.layout = {
            activate() {
                this.fix();
                $(window, ".wrapper").resize(() => {
                    this.fix();
                });
            },
            fix() {
                //Get window height and the wrapper height
                var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                var window_height = $(window).height();
                var sidebar_height = $(".sidebar").height();
                //Set the min-height of the content and sidebar based on the
                //the height of the document.
                if ($("body").hasClass("fixed")) {
                    $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
                } else {
                    var postSetWidth;
                    if (window_height >= sidebar_height) {
                        $(".content-wrapper, .right-side").css('min-height', window_height - neg);
                        postSetWidth = window_height - neg;
                    } else {
                        $(".content-wrapper, .right-side").css('min-height', sidebar_height);
                        postSetWidth = sidebar_height;
                    }

                    //Fix for the control sidebar height
                    var controlSidebar = $(adminlte.options.controlSidebarOptions.selector);
                    if (typeof controlSidebar !== "undefined") {
                        if (controlSidebar.height() > postSetWidth)
                            $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
                    }
                }
            },
        };

        this.pushMenu = {
            cssAnimationSpeed: adminlte.options.cssAnimationSpeed,
            activate(toggleBtn) {
                $(toggleBtn).on('click', (e) => {
                    e.preventDefault();

                    //Enable sidebar push menu
                    if ($(window).width() > (adminlte.options.screenSizes.sm - 1)) {
                        if ($("body").hasClass('sidebar-collapse')) {
                            $("#content-wrapper").addClass('has-sidebar');
                            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                        } else {
                            $("#content-wrapper").removeClass('has-sidebar');
                            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                        }
                    }
                    //Handle sidebar push menu for small screens
                    else {
                        if ($("body").hasClass('sidebar-open')) {
                            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                        } else {
                            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                        }
                    }
                });

                $(".content-wrapper").click(() => {
                    //Enable hide menu when clicking on the content-wrapper on small screens
                    if ($(window).width() <= (adminlte.options.screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                        $("body").removeClass('sidebar-open');
                    }
                });

                //Enable expand on hover for sidebar mini
                if (adminlte.options.sidebarExpandOnHover
                    || ($('body').hasClass('fixed')
                    && $('body').hasClass('sidebar-mini'))) {
                    this.expandOnHover();
                }
            },
            expandOnHover() {
                var screenWidth = adminlte.options.screenSizes.sm - 1;
                //Expand sidebar on hover
                $('.main-sidebar').hover(() => {
                    if ($('body').hasClass('sidebar-mini')
                        && $("body").hasClass('sidebar-collapse')
                        && $(window).width() > screenWidth) {
                        $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
                    }
                }, () => {
                    if ($('body').hasClass('sidebar-mini')
                        && $('body').hasClass('sidebar-expanded-on-hover')
                        && $(window).width() > screenWidth) {
                        if ($('body').hasClass('sidebar-expanded-on-hover')) {
                            $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
                        }
                    }
                });
            }
        };

        this.tree = (menu) => {
            var animationSpeed = this.options.animationSpeed;
            let adminlte = this;
            $(document).on('click', menu + ' li a', function (e) {
                //Get the clicked link and the next element
                var element = $(e.target);
                var checkElement = element.next();

                //Check if the next element is a menu and is visible
                if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                    //Close the menu
                    checkElement.slideUp(animationSpeed, function () {
                        checkElement.removeClass('menu-open');
                        //Fix the layout in case the sidebar stretches over the height of the window
                        //_this.layout.fix();
                    });
                    checkElement.parent("li").removeClass("active");
                }
                //If the menu is not visible
                else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                    //Get the parent menu
                    var parent = element.parents('ul').first();
                    //Close all open menus within the parent
                    var ul = parent.find('ul:visible').slideUp(animationSpeed);
                    //Remove the menu-open class from the parent
                    ul.removeClass('menu-open');
                    //Get the parent li
                    var parent_li = element.parent("li");

                    //Open the target menu and add the menu-open class
                    checkElement.slideDown(animationSpeed, () => {
                        //Add the class active to the parent li
                        checkElement.addClass('menu-open');
                        parent.find('li.active').removeClass('active');
                        parent_li.addClass('active');
                        //Fix the layout in case the sidebar stretches over the height of the window
                        adminlte.layout.fix();
                    });
                }
                //if this isn't a link, prevent the page from being redirected
                if (checkElement.is('.treeview-menu')) {
                    e.preventDefault();
                }
            });
        };

    }

};