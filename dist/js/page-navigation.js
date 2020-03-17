export function loadPageNavScript() {
    var i = 0;
    var j = 0;
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
        Q('#pageUp3').className = 'scaleDown';
        if (localStorage.userId)
            username.value = localStorage.userId;
        i = 0;
        j = 0;
        setTimeout(function () {
            Q('#buttons-wrapper').className = 'slideDownControls';
            Q('#fixedTop3').className = 'slideUp';
            previousButton.className = 'scaleDown';
            signInPage.style.overflowY = 'hidden';
            furtherDiscussion.style.overflowY = 'hidden';
            setTimeout(function () {
                furtherDiscussion.className = 'translate';
                setTimeout(function () {
                    signInPage.className = 'fadeIn custom-scroll-bar';
                    signInPage.style.display = 'flex';
                    signInPage.style.overflowY = 'auto';
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
        nextPage.style.overflowY = 'hidden';
        nextPage.style.zIndex = '1';
        currentPage.style.overflowY = 'hidden';
        currentPage.className = 'translate';
        currentPage.style.zIndex = '2';
        setTimeout(function () {
            nextPage.style.display = 'flex';
            nextPage.className = 'fadeIn custom-scroll-bar';
            nextPage.style.overflowY = 'auto';
            setTimeout(function () {
                currentPage.style.display = 'none';
                currentPage.className = '';
            }, 600);
        }, 200);
        if (j == numOfPages - 1) {
            nextButton.className = 'scaleDown';
            previousButton.className = 'scaleUp';
        }
        else if (j == 0) {
            nextButton.className = 'scaleUp';
            previousButton.className = 'scaleDown';
        }
        else {
            nextButton.className = 'scaleUp';
            previousButton.className = 'scaleUp';
        }
        pageNumber.textContent = j + 1 + ' / ' + numOfPages;
        if (j == 0)
            for (var n = 1; n < fixedTops.length; n++) {
                Q("#" + pageUpButtons[n]).className = 'scaleDown';
                Q("#" + fixedTops[n]).className = 'slideUp';
            }
        else if (j == 1 && i == 0) {
            Q("#" + fixedTops.slice(-1)).className = 'slideUp';
            setTimeout(function () {
                Q("#" + fixedTops[j]).className = 'slideDown';
                Q("#" + fixedTops.slice(-1)).className = '';
            }, 100);
        }
        else if (j - i == 1 && true) {
            Q("#" + fixedTops[i]).className = 'slideUp';
            setTimeout(function () {
                Q("#" + fixedTops[j]).className = 'slideDown';
                Q("#" + fixedTops[i]).className = '';
            }, 100);
        }
        else if (j - i < 1) {
            Q("#" + fixedTops[i]).className = 'slideDown';
            setTimeout(function () {
                Q("#" + fixedTops[1]).className = 'slideUp';
                Q("#" + fixedTops[i]).className = '';
            }, 100);
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
        currentPage.className = 'fadeOut';
        currentPage.style.zIndex = '1';
        currentPage.style.overflowY = 'hidden';
        previousPage.style.overflowY = 'hidden';
        previousPage.style.display = 'flex';
        previousPage.className = 'translateBack custom-scroll-bar';
        previousPage.style.zIndex = '2';
        setTimeout(function () {
            currentPage.style.display = 'none';
            currentPage.className = '';
            previousPage.style.overflowY = 'auto';
            previousPage.className = 'custom-scroll-bar';
        }, 500);
        if (j == numOfPages - 1) {
            nextButton.className = 'scaleDown';
            previousButton.className = 'scaleUp';
        }
        else if (j == 0) {
            nextButton.className = 'scaleUp';
            previousButton.className = 'scaleDown';
        }
        else {
            nextButton.className = 'scaleUp';
            previousButton.className = 'scaleUp';
        }
        previousButton.style.display = 'inline-flex';
        pageNumber.textContent = j + 1 + " / " + numOfPages;
        if (j == 0)
            for (var n = 1; n < fixedTops.length; n++) {
                Q("#" + pageUpButtons[n]).className = 'scaleDown';
                Q("#" + fixedTops[n]).className = 'slideUp';
            }
        else if (j == fixedTops.length - 1 && i == 0) {
            Q("#" + fixedTops[1]).className = 'slideUp';
            setTimeout(function () {
                Q("#" + fixedTops[j]).className = 'slideDown';
                Q("#" + fixedTops[1]).className = '';
            }, 100);
        }
        else if (j - i != 1 && j != fixedTops.length - 1) {
            Q("#" + fixedTops[i]).className = 'slideUp';
            setTimeout(function () {
                Q("#" + fixedTops[j]).className = 'slideDown';
                Q("#" + fixedTops[i]).className = '';
            }, 100);
        }
        else if (j - i == 1) {
            Q("#" + fixedTops[i]).className = 'slideUp';
            setTimeout(function () {
                Q("#" + fixedTops.slice(-1)).className = 'slideDown';
                Q("#" + fixedTops[i]).className = '';
            }, 100);
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
    }
    function touch(event) {
        startSwipe = event.changedTouches[0].clientX;
    }
    function swipe(event) {
        swipeCoord = event.changedTouches[0].clientX - startSwipe;
        if (event.changedTouches.length > 1)
            return;
        if (swipeCoord < -105 && j != numOfPages - 1)
            nextButton.click();
        if (swipeCoord > 105 && j != 0)
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
                Q("#" + pageUpButtons.slice(-1)).className = 'scaleDown';
                setTimeout(function () {
                    currentPageUpButton.className = 'scaleUp';
                }, 100);
            }
            else if (j - i < 1) {
                nextOrPrevPageUpButton.className = 'scaleDown';
                setTimeout(function () {
                    currentPageUpButton.className = 'scaleUp';
                }, 100);
            }
            else if (j - i == 1) {
                nextOrPrevPageUpButton.className = 'scaleDown';
                setTimeout(function () {
                    currentPageUpButton.className = 'scaleUp';
                }, 100);
            }
            else if (j == pageUpButtons.length - 1 && i != 0) {
                currentPageUpButton.className = 'scaleDown';
                setTimeout(function () {
                    nextOrPrevPageUpButton.className = 'scaleUp';
                }, 100);
            }
        }
        else {
            for (var n = 1; n < pageUpButtons.length; n++)
                Q("#" + pageUpButtons[n]).className = 'scaleDown';
        }
    }
    var classSizeRef = function () {
        if (j == 3) {
            furtherDiscussion.className = 'fadeOut';
            furtherDiscussion.style.zIndex = '1';
            j = 1;
            i = 2;
            var currentPage_1 = Q("#" + pageNames[i]);
            var refPage_1 = Q("#" + pageNames[j]);
            var currentPageUpButton_1 = Q("#" + pageUpButtons[3]);
            var refPageUpButton_1 = Q("#" + pageUpButtons[j]);
            currentPage_1.className = 'fadeOut';
            currentPage_1.style.zIndex = '1';
            refPage_1.style.display = 'flex';
            refPage_1.className = 'translateBack';
            refPage_1.style.zIndex = '2';
            setTimeout(function () {
                furtherDiscussion.style.display = 'none';
                currentPage_1.style.display = 'none';
                currentPage_1.className = '';
                refPage_1.className = '';
            }, 600);
            currentPageUpButton_1.style.zIndex = '1';
            refPageUpButton_1.className = 'scaleUp';
            refPageUpButton_1.style.zIndex = '0';
            setTimeout(function () {
                refPageUpButton_1.style.zIndex = '1';
                currentPageUpButton_1.className = 'scaleDown';
                currentPageUpButton_1.style.zIndex = '0';
            }, 300);
        }
    };
    Q('#semi-interquartile-range-ref').onclick = classSizeRef;
    Q('#the-percentiles-ref').onclick = classSizeRef;
    Q('#quartiles-median-ref').onclick = classSizeRef;
    Q('#link-to-median').onclick = classSizeRef;
    Q('#myName').textContent = "@Power'f-GOD ⚡⚡";
    var takeExampleRef = function () {
        if (j == 1) {
            j = 2;
            i = 1;
            var currentPage_2 = Q("#" + pageNames[i]);
            var refPage_2 = Q("#" + pageNames[j]);
            var currentPageUpButton_2 = Q("#" + pageUpButtons[1]);
            var refPageUpButton_2 = Q("#" + pageUpButtons[j]);
            currentPage_2.className = 'translate';
            currentPage_2.style.zIndex = '1';
            refPage_2.style.zIndex = '2';
            setTimeout(function () {
                refPage_2.style.display = 'flex';
                refPage_2.className = 'fadeIn';
                setTimeout(function () {
                    currentPage_2.style.display = 'none';
                    currentPage_2.className = '';
                }, 400);
            }, 200);
            currentPageUpButton_2.style.zIndex = '1';
            refPageUpButton_2.className = 'scaleUp';
            refPageUpButton_2.style.zIndex = '0';
            setTimeout(function () {
                refPageUpButton_2.style.zIndex = '1';
                currentPageUpButton_2.className = 'scaleDown';
                currentPageUpButton_2.style.zIndex = '0';
            }, 300);
        }
    };
    Q('#take-example').onclick = takeExampleRef;
}
