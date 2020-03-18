export function loadPageNavScript() {
    var i = 0;
    var j = 0;
    document.body.onkeyup = function (e) {
        var key = e.keyCode || e.which;
        if (key == 39 && j != numOfPages - 1)
            nextButton.click();
        else if (key == 37 && j !== 0)
            previousButton.click();
    };
    var pageNames = [
        'welcome-page',
        'formulae-container',
        'question-solutions',
        'further-discussion'
    ];
    var numOfPages = pageNames.length;
    var fixedTops = [null, 'fixedTop1', 'fixedTop2', 'fixedTop3'];
    var pageUpButtons = [null, 'pageUp1', 'pageUp2', 'pageUp3'];
    signOutButton.onclick = function () {
        signOutButton.textContent = 'Signing out...';
        signOutButton.style.width = 'auto';
        signOutButton.style.padding = '10px 20px';
        Q('#pageUp3').className = 'scale-down';
        if (localStorage.userId)
            username = localStorage.userId;
        i = 0;
        j = 0;
        setTimeout(function () {
            Q('#buttons-wrapper').className = 'slide-down-controls';
            Q('#fixedTop3').className = 'slide-up';
            previousButton.className = 'scale-down';
            setTimeout(function () {
                furtherDiscussion.className = 'custom-scroll-bar translate-out-left';
                setTimeout(function () {
                    signInPage.className = 'custom-scroll-bar translate-in';
                    signOutButton.textContent = 'Sign Out';
                }, 500);
            }, 1300);
        }, 1700);
    };
    pageNumber.textContent = '1 / ' + numOfPages;
    nextButton.onclick = function () {
        if (i == 0 && j == 0) {
            i = 0;
            j++;
        }
        else if (j == numOfPages - 1 && i == numOfPages - 2) {
            j = 0;
            i++;
        }
        else if (i == numOfPages - 1 && j == 0) {
            i = 0;
            j++;
        }
        else if (i == 0 && j == numOfPages - 1) {
            i = j;
            j = 0;
        }
        else if (i - j == 1) {
            i = j;
            j++;
        }
        else {
            i++;
            j++;
        }
        var currentPage = Q("#" + pageNames[i]);
        var nextPage = Q("#" + pageNames[j]);
        currentPage.className = 'custom-scroll-bar translate-out-left';
        nextPage.className = 'custom-scroll-bar translate-in';
        if (j == numOfPages - 1) {
            nextButton.className = 'scale-down';
            previousButton.className = 'scale-up';
        }
        else if (j == 0) {
            nextButton.className = 'scale-up';
            previousButton.className = 'scale-down';
        }
        else {
            nextButton.className = 'scale-up';
            previousButton.className = 'scale-up';
        }
        pageNumber.textContent = j + 1 + ' / ' + numOfPages;
        if (j == 0) {
            Q("#" + pageUpButtons[j + 1]).className = 'scale-down';
        }
        else if (j == 1 && i == 0) {
            Q("#" + fixedTops.slice(-1)).className = 'slide-up';
            Q("#" + fixedTops[j]).className = 'slide-down';
        }
        else if (j - i == 1 && true) {
            Q("#" + fixedTops[i]).className = 'slide-up';
            Q("#" + fixedTops[j]).className = 'slide-down';
        }
        else if (j - i < 1) {
            Q("#" + fixedTops[i]).className = 'slide-down';
            Q("#" + fixedTops[1]).className = 'slide-up';
        }
        setTimeout(displayPageUpButton, 200);
    };
    previousButton.onclick = function () {
        if (i == 0 && j == 0) {
            i = 0;
            j = numOfPages - 1;
        }
        else if (i == numOfPages - 1 && j == 0) {
            i = j;
            j = numOfPages - 1;
        }
        else if (i == 0 && j == 1) {
            i = j;
            j--;
        }
        else if (i == 0 && j == numOfPages - 1) {
            i = numOfPages - 1;
            j--;
        }
        else if (i == 1 && j == 0) {
            j = numOfPages - 1;
            i = 0;
        }
        else if (i - j == -1) {
            i = j;
            j--;
        }
        else {
            j--;
            i--;
        }
        var currentPage = Q("#" + pageNames[i]);
        var previousPage = Q("#" + pageNames[j]);
        currentPage.className = 'custom-scroll-bar translate-out-right';
        previousPage.className = 'custom-scroll-bar translate-in';
        if (j == numOfPages - 1) {
            nextButton.className = 'scale-down';
            previousButton.className = 'scale-up';
        }
        else if (j == 0) {
            nextButton.className = 'scale-up';
            previousButton.className = 'scale-down';
        }
        else {
            nextButton.className = 'scale-up';
            previousButton.className = 'scale-up';
        }
        previousButton.style.display = 'inline-flex';
        pageNumber.textContent = j + 1 + " / " + numOfPages;
        if (j == 0)
            for (var n = 1; n < fixedTops.length; n++) {
                Q("#" + pageUpButtons[n]).className = 'scale-down';
                Q("#" + fixedTops[n]).className = 'slide-up';
            }
        else if (j == fixedTops.length - 1 && i == 0) {
            Q("#" + fixedTops[1]).className = 'slide-up';
            Q("#" + fixedTops[j]).className = 'slide-down';
        }
        else if (j - i != 1 && j != fixedTops.length - 1) {
            Q("#" + fixedTops[i]).className = 'slide-up';
            Q("#" + fixedTops[j]).className = 'slide-down';
        }
        else if (j - i == 1) {
            Q("#" + fixedTops[i]).className = 'slide-up';
            Q("#" + fixedTops.slice(-1)).className = 'slide-down';
        }
        setTimeout(displayPageUpButton, 200);
    };
    var startSwipe = 0;
    var swipeCoord = 0;
    addSwipeListeners();
    QAll('.prevent-swipe').forEach(function (el) {
        el.addEventListener('scroll', removeSwipeListeners);
        el.addEventListener('touchend', function () {
            setTimeout(addSwipeListeners, 100);
        });
    });
    QAll('.custom-scroll-bar').forEach(function (el) {
        el.addEventListener('scroll', removeSwipeListeners);
        el.addEventListener('touchend', function () {
            setTimeout(addSwipeListeners, 100);
        });
    });
    function addSwipeListeners() {
        pageNames.forEach(function (name) {
            Q("#" + name).addEventListener('touchstart', touch);
            Q("#" + name).addEventListener('touchend', swipe);
        });
    }
    function removeSwipeListeners() {
        pageNames.forEach(function (name) {
            Q("#" + name).removeEventListener('touchstart', touch);
            Q("#" + name).removeEventListener('touchend', swipe);
        });
        leftElastic.style.width = '0';
        rightElastic.style.width = '0';
    }
    var leftElastic = Q('#left-elastic');
    var rightElastic = Q('#right-elastic');
    function touch(event) {
        startSwipe = event.changedTouches[0].clientX;
        if (Math.abs(swipeCoord) > 25)
            if (j == 0) {
                leftElastic.style.width = '10rem';
            }
            else if (j == numOfPages - 1) {
                rightElastic.style.width = '10rem';
            }
    }
    function swipe(event) {
        swipeCoord = event.changedTouches[0].clientX - startSwipe;
        leftElastic.style.width = '0';
        rightElastic.style.width = '0';
        if (event.touches.length > 1)
            return;
        if (swipeCoord < -50 && j != numOfPages - 1)
            nextButton.click();
        if (swipeCoord > 50 && j != 0)
            previousButton.click();
    }
    for (var p = 1; p < numOfPages; p++)
        Q("#" + pageNames[p]).addEventListener('scroll', displayPageUpButton);
    function displayPageUpButton() {
        var scrollPosition = Q("#" + pageNames[j]).scrollTop;
        var currentPageUpButton = Q("#" + pageUpButtons[j]);
        var nextOrPrevPageUpButton = Q("#" + pageUpButtons[i]);
        if (j == 0)
            return;
        if (scrollPosition <= 1000 && currentPageUpButton.className == '')
            return;
        if (scrollPosition > 1000) {
            if (i == 0 && j == 1) {
                Q("#" + pageUpButtons.slice(-1)).className = 'scale-down';
                currentPageUpButton.className = 'scale-up';
            }
            else if (j - i < 1) {
                nextOrPrevPageUpButton.className = 'scale-down';
                currentPageUpButton.className = 'scale-up';
            }
            else if (j - i == 1) {
                nextOrPrevPageUpButton.className = 'scale-down';
                currentPageUpButton.className = 'scale-up';
            }
            else if (j == pageUpButtons.length - 1 && i != 0) {
                currentPageUpButton.className = 'scale-down';
                nextOrPrevPageUpButton.className = 'scale-up';
            }
        }
        else {
            for (var n = 1; n < pageUpButtons.length; n++)
                Q("#" + pageUpButtons[n]).className = 'scale-down';
        }
    }
    var classSizeRef = function () {
        if (j == 3) {
            furtherDiscussion.className = 'custom-scroll-bar translate-out-right';
            j = 1;
            i = 2;
            var currentPage = Q("#" + pageNames[i]);
            var refPage = Q("#" + pageNames[j]);
            var currentPageUpButton = Q("#" + pageUpButtons[3]);
            var refPageUpButton = Q("#" + pageUpButtons[j]);
            currentPage.className = 'custom-scroll-bar translate-out-right';
            refPage.className = 'custom-scroll-bar translate-in';
            refPageUpButton.className = 'scale-up';
            currentPageUpButton.className = 'scale-down';
        }
    };
    Q('#semi-interquartile-range-ref').onclick = classSizeRef;
    Q('#the-percentiles-ref').onclick = classSizeRef;
    Q('#quartiles-median-ref').onclick = classSizeRef;
    Q('#link-to-median').onclick = classSizeRef;
    var takeExampleRef = function () {
        if (j == 1) {
            j = 2;
            i = 1;
            var currentPage = Q("#" + pageNames[i]);
            var refPage = Q("#" + pageNames[j]);
            var currentPageUpButton = Q("#" + pageUpButtons[1]);
            var refPageUpButton = Q("#" + pageUpButtons[j]);
            currentPage.className = 'custom-scroll-bar translate-out-left';
            refPage.className = 'custom-scroll-bar translate-in';
            refPageUpButton.className = 'scale-up';
            currentPageUpButton.className = 'scale-down';
        }
    };
    Q('#take-example').onclick = takeExampleRef;
}
