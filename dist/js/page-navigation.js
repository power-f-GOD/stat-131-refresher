export function loadPageNavScript() {
    var i = 0;
    var j = 0;
    var pages = QAll('div[data-role="page"]');
    var numOfPages = pages.length;
    var pageTitleBar = Q('#page-title-bar');
    var pageTitles = QAll('.page-title');
    var goUpButtons = QAll('button[data-name="go-up-button"]');
    var numOfGoUpButtons = goUpButtons.length;
    goUpButtons.forEach(function (button, i) {
        return button.addEventListener('click', function () {
            var index = i + 1;
            var start = setInterval(function () {
                pages[index].scrollTop -= 100;
                if (pages[index].scrollTop <= 0)
                    clearInterval(start);
            }, 16);
            pages[index].onclick = function () { return clearInterval(start); };
        });
    });
    document.body.onkeyup = function (e) {
        var key = e.keyCode || e.which;
        if (key == 39 && j != numOfPages - 1)
            nextButton.click();
        else if (key == 37 && j !== 0)
            previousButton.click();
    };
    signOutButton.onclick = function () {
        signOutButton.textContent = 'Signing out...';
        goUpButtons[2].className = 'scale-down';
        if (localStorage.userId)
            username = localStorage.userId;
        i = 0;
        j = 0;
        setTimeout(function () {
            Q('#buttons-wrapper').className = 'slide-down-controls';
            pageTitleBar.dataset.state = 'hidden';
            previousButton.className = 'scale-down';
            previousButton.dataset.state = 'hidden';
            goUpButtons[2].dataset.state = 'hidden';
            setTimeout(function () {
                furtherDiscussion.className = 'custom-scroll-bar translate-out-left';
                signInPage.dataset.state = 'visible';
                setTimeout(function () {
                    furtherDiscussion.dataset.state = 'hidden';
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
    var currentGoUpButton;
    var nextOrPrevGoUpButton;
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
        nextOrPrevPage.dataset.state = 'visible';
        setTimeout(function () {
            currentPage.className = 'custom-scroll-bar translate-out-left';
            nextOrPrevPage.className = 'custom-scroll-bar translate-in';
            pageTitleBar.dataset.state = 'visible';
        }, 100);
        displayNavigationButtons();
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
        nextOrPrevPage.dataset.state = 'visible';
        setTimeout(function () {
            currentPage.className = 'custom-scroll-bar translate-out-right';
            nextOrPrevPage.className = 'custom-scroll-bar translate-in';
            displayNavigationButtons();
        }, 100);
    };
    function displayNavigationButtons() {
        pageNumber.textContent = j + 1 + " / " + numOfPages;
        if (j == numOfPages - 1) {
            previousButton.dataset.state = 'visible';
        }
        else if (j == 0) {
            nextButton.dataset.state = 'visible';
        }
        else {
            previousButton.dataset.state = 'visible';
            nextButton.dataset.state = 'visible';
        }
        setTimeout(function () {
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
                displayGoUpButton();
                previousButton.disabled = false;
                nextButton.disabled = false;
            }, 200);
        }, 100);
    }
    var startCoord = 0;
    var swipeCoord = 0;
    var endCoord = 0;
    var leftElastic = Q('#left-elastic');
    var rightElastic = Q('#right-elastic');
    pages.forEach(function (page) {
        page.addEventListener('touchstart', touchStart);
        page.addEventListener('touchend', swipe);
        page.addEventListener('scroll', displayGoUpButton);
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
                nextOrPrevPage.addEventListener('touchstart', touchStart);
                nextOrPrevPage.addEventListener('touchend', swipe);
            }, 300);
        hideElastic();
    }
    function removeSwipeListeners() {
        if (nextOrPrevPage) {
            nextOrPrevPage.removeEventListener('touchstart', touchStart);
            nextOrPrevPage.removeEventListener('touchend', swipe);
        }
        hideElastic();
    }
    function touchStart(event) {
        startCoord = event.changedTouches[0].clientX;
    }
    function swipe(event) {
        endCoord = event.changedTouches[0].clientX;
        swipeCoord = endCoord - startCoord;
        if (Math.abs(swipeCoord) > 25)
            if (j == 0 && swipeCoord > 0) {
                leftElastic.style.width = '10rem';
            }
            else if (j == numOfPages - 1 && swipeCoord <= 0) {
                rightElastic.style.width = '10rem';
            }
        hideElastic();
        if (event.touches.length > 1)
            return;
        if (swipeCoord < -50 && j != numOfPages - 1)
            nextButton.click();
        else if (swipeCoord > 50 && j != 0)
            previousButton.click();
    }
    function hideElastic() {
        setTimeout(function () {
            leftElastic.style.width = '0';
            rightElastic.style.width = '0';
        }, 600);
    }
    function displayGoUpButton() {
        if (j == 0)
            return;
        var scrollPosition = pages[j].scrollTop;
        currentGoUpButton = goUpButtons[j == 0 ? j : j - 1];
        nextOrPrevGoUpButton = goUpButtons[i == 0 ? 0 : i - 1];
        if (scrollPosition > 1000) {
            currentGoUpButton.dataset.state = 'visible';
        }
        setTimeout(function () {
            if (scrollPosition <= 1000 &&
                currentGoUpButton.className == 'scale-down') {
                nextOrPrevGoUpButton.className = 'scale-down';
                return;
            }
            if (scrollPosition > 1000) {
                if (i == 0 && j == 1) {
                    goUpButtons[numOfGoUpButtons - 1].className = 'scale-down';
                    currentGoUpButton.className = 'scale-up';
                }
                else if (j - i < 1) {
                    nextOrPrevGoUpButton.className = 'scale-down';
                    currentGoUpButton.className = 'scale-up';
                }
                else if (j - i == 1) {
                    nextOrPrevGoUpButton.className = 'scale-down';
                    currentGoUpButton.className = 'scale-up';
                }
                else if (j == numOfGoUpButtons - 1 && i != 0) {
                    currentGoUpButton.className = 'scale-down';
                    nextOrPrevGoUpButton.className = 'scale-up';
                }
            }
            else {
                currentGoUpButton.className = 'scale-down';
            }
        }, 100);
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
