export function loadPageNavScript() {
    var i = 0;
    var j = 0;
    var pages = QAll('div[data-role="page"]');
    var numOfPages = pages.length;
    var pageTitleBar = Q('#page-title-bar');
    var pageTitles = QAll('.page-title');
    var goUpButtons = QAll('span[data-name="go-up-button"]');
    var numOfPageUpButtons = goUpButtons.length;
    document.body.onkeyup = function (e) {
        var key = e.keyCode || e.which;
        if (key == 39 && j != numOfPages - 1)
            nextButton.click();
        else if (key == 37 && j !== 0)
            previousButton.click();
    };
    signOutButton.onclick = function () {
        signOutButton.textContent = 'Signing out...';
        Q('#pageUp3').className = 'scale-down';
        if (localStorage.userId)
            username = localStorage.userId;
        i = 0;
        j = 0;
        setTimeout(function () {
            Q('#buttons-wrapper').className = 'slide-down-controls';
            pageTitleBar.dataset.state = 'hidden';
            previousButton.className = 'scale-down';
            setTimeout(function () {
                furtherDiscussion.className = 'custom-scroll-bar translate-out-left';
                setTimeout(function () {
                    signInPage.className = 'custom-scroll-bar translate-in';
                    pages.forEach(function (page) { return (page.className = 'custom-scroll-bar'); });
                    signOutButton.textContent = 'Sign Out';
                }, 500);
            }, 1300);
        }, 1700);
    };
    pageNumber.textContent = '1 / ' + numOfPages;
    var currentPage;
    var nextOrPrevPage;
    var currentPageUpButton;
    var nextOrPrevPageUpButton;
    nextButton.onclick = function () {
        nextButton.disabled = true;
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
        currentPage = pages[i];
        nextOrPrevPage = pages[j];
        currentPage.className = 'custom-scroll-bar translate-out-left';
        nextOrPrevPage.className = 'custom-scroll-bar translate-in';
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
        pageTitleBar.dataset.state = 'visible';
        if (j == 0) {
            goUpButtons[j].className = 'scale-down';
            pageTitleBar.dataset.state = 'hidden';
        }
        else if (j == 1 && i == 0) {
            pageTitles[numOfPages - 2].dataset.state = 'hidden';
            pageTitles[j - 1].dataset.state = 'visible';
        }
        else if (j - i == 1) {
            pageTitles[i - 1].dataset.state = 'hidden';
            pageTitles[j - 1].dataset.state = 'visible';
        }
        setTimeout(function () {
            displayPageUpButton();
            nextButton.disabled = false;
        }, 300);
    };
    previousButton.onclick = function () {
        previousButton.disabled = true;
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
        currentPage = pages[i];
        nextOrPrevPage = pages[j];
        currentPage.className = 'custom-scroll-bar translate-out-right';
        nextOrPrevPage.className = 'custom-scroll-bar translate-in';
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
        if (j == 0) {
            goUpButtons[j].className = 'scale-down';
            pageTitleBar.dataset.state = 'hidden';
        }
        else if (j == numOfPages - 1 && i == 0) {
            pageTitles[i].dataset.state = 'hidden';
            pageTitles[j].dataset.state = 'visible';
        }
        else if (j - i != 1 && j != numOfPages - 1) {
            pageTitles[i - 1].dataset.state = 'hidden';
            pageTitles[j - 1].dataset.state = 'visible';
        }
        setTimeout(function () {
            displayPageUpButton();
            previousButton.disabled = false;
        }, 300);
    };
    var startSwipe = 0;
    var swipeCoord = 0;
    var leftElastic = Q('#left-elastic');
    var rightElastic = Q('#right-elastic');
    pages.forEach(function (page) {
        page.addEventListener('touchstart', touch);
        page.addEventListener('touchend', swipe);
        page.addEventListener('scroll', displayPageUpButton);
    });
    QAll('.prevent-swipe').forEach(function (el) {
        el.addEventListener('scroll', removeSwipeListeners);
        el.addEventListener('touchend', addSwipeListeners);
    });
    QAll('.custom-scroll-bar').forEach(function (el) {
        el.addEventListener('scroll', removeSwipeListeners);
        el.addEventListener('touchend', addSwipeListeners);
    });
    function addSwipeListeners() {
        if (nextOrPrevPage)
            setTimeout(function () {
                nextOrPrevPage.addEventListener('touchstart', touch);
                nextOrPrevPage.addEventListener('touchend', swipe);
            }, 300);
        hideElastic();
    }
    function removeSwipeListeners() {
        if (nextOrPrevPage) {
            nextOrPrevPage.removeEventListener('touchstart', touch);
            nextOrPrevPage.removeEventListener('touchend', swipe);
        }
        hideElastic();
    }
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
        hideElastic();
        if (event.touches.length > 1)
            return;
        if (swipeCoord < -50 && j != numOfPages - 1)
            nextButton.click();
        if (swipeCoord > 50 && j != 0)
            previousButton.click();
    }
    function hideElastic() {
        leftElastic.style.width = '0';
        rightElastic.style.width = '0';
    }
    function displayPageUpButton() {
        if (j == 0)
            return;
        var scrollPosition = pages[j].scrollTop;
        currentPageUpButton = goUpButtons[j - 1];
        nextOrPrevPageUpButton = goUpButtons[i == 0 ? 0 : i - 1];
        if (scrollPosition <= 1000 &&
            currentPageUpButton.className == 'scale-down') {
            nextOrPrevPageUpButton.className = 'scale-down';
            return;
        }
        if (scrollPosition > 1000) {
            if (i == 0 && j == 1) {
                goUpButtons[numOfPageUpButtons - 1].className = 'scale-down';
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
            else if (j == numOfPageUpButtons - 1 && i != 0) {
                currentPageUpButton.className = 'scale-down';
                nextOrPrevPageUpButton.className = 'scale-up';
            }
        }
        else {
            currentPageUpButton.className = 'scale-down';
        }
    }
    var classSizeRef = function () {
        if (j == 3) {
            furtherDiscussion.className = 'custom-scroll-bar translate-out-right';
            pageTitles[2].dataset.state = 'hidden';
            goUpButtons[2].className = 'scale-down';
            j = 2;
            i = 1;
            previousButton.click();
        }
    };
    Q('#semi-interquartile-range-ref').onclick = classSizeRef;
    Q('#the-percentiles-ref').onclick = classSizeRef;
    Q('#quartiles-median-ref').onclick = classSizeRef;
    Q('#link-to-median').onclick = classSizeRef;
    Q('#take-example').onclick = function (e) {
        e.preventDefault();
        nextButton.click();
    };
}
