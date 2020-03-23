export function loadPageNavScript() {
    var i = 0;
    var j = 0;
    goUpButtons.forEach(function (button, i) {
        return button.addEventListener('click', function () {
            var index = i + 1;
            var spy = customInterval(function () {
                var id = spy.id;
                pages[index].scrollTop -= 150;
                if (pages[index].scrollTop <= 0)
                    _cancelAnimationFrame(+id);
                pages[index].onclick = function () { return _cancelAnimationFrame(+id); };
            }, 0);
        });
    });
    document.body.addEventListener('keyup', handleKeyboardNavEvent);
    QAll('input').forEach(function (input) {
        input.addEventListener('focus', function () {
            document.body.removeEventListener('keyup', handleKeyboardNavEvent);
        });
        input.addEventListener('blur', function () {
            document.body.addEventListener('keyup', handleKeyboardNavEvent);
        });
    });
    function handleKeyboardNavEvent(e) {
        var key = e.keyCode || e.which;
        if (key == 39 && j != numOfPages - 1)
            gotoNextPage();
        else if (key == 37 && j !== 0)
            gotoPreviousPage();
    }
    signOutButton.onclick = function () {
        signOutButton.textContent = 'Signing out...';
        rememberMeCheckbox.checked = false;
        rememberMe = false;
        goUpButtons[2].className = 'scale-down';
        if (navigator.cookieEnabled) {
            if (localStorage.userId)
                username = localStorage.userId;
            localStorage.rememberMe = false;
        }
        i = 0;
        j = 0;
        delay(1500).then(function () {
            Q('#buttons-wrapper').className = 'slide-down-controls';
            pageTitleBar.dataset.state = 'hidden';
            previousButton.className = 'scale-down';
            previousButton.dataset.state = 'hidden';
            goUpButtons[2].dataset.state = 'hidden';
            delay(1000).then(function () {
                furtherDiscussion.className = 'custom-scroll-bar translate-out-left';
                signInPage.dataset.state = 'visible';
                delay(500).then(function () {
                    furtherDiscussion.dataset.state = 'hidden';
                    signInPage.className = 'custom-scroll-bar translate-in';
                    pages.forEach(function (page) { return (page.className = 'custom-scroll-bar'); });
                    signOutButton.textContent = 'Sign Out';
                });
            });
        });
    };
    pageNumber.textContent = '1 / ' + numOfPages;
    var currentPage;
    var nextOrPrevPage;
    var currentGoUpButton;
    var nextOrPrevGoUpButton;
    nextButton.onclick = gotoNextPage;
    function gotoNextPage() {
        if (i == 0 && j == 0) {
            i = 0;
            j++;
        }
        else if (i - j == 1) {
            i = j;
            j++;
        }
        else {
            if (j < numOfPages - 1) {
                i++;
                j++;
            }
        }
        currentPage = pages[i];
        nextOrPrevPage = pages[j];
        nextOrPrevPage.dataset.state = 'visible';
        delay(5).then(function () {
            currentPage.className = 'custom-scroll-bar translate-out-left';
            nextOrPrevPage.className = 'custom-scroll-bar translate-in';
            pageTitleBar.dataset.state = 'visible';
        });
        displayNavigationButtons();
    }
    previousButton.onclick = gotoPreviousPage;
    function gotoPreviousPage() {
        if (i - j == -1) {
            i = j;
            j--;
        }
        else {
            if (j > 0) {
                j--;
                i--;
            }
        }
        currentPage = pages[i];
        nextOrPrevPage = pages[j];
        nextOrPrevPage.dataset.state = 'visible';
        delay(5).then(function () {
            currentPage.className = 'custom-scroll-bar translate-out-right';
            nextOrPrevPage.className = 'custom-scroll-bar translate-in';
        });
        displayNavigationButtons();
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
    function displayNavigationButtons() {
        if (j == 2) {
            var interval = localStorage.interval, frequencies = localStorage.frequencies;
            if (interval && !intervalInput.value)
                intervalInput.value = interval;
            if (frequencies && !frequenciesInput.value)
                frequenciesInput.value = frequencies;
        }
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
        delay(5).then(function () {
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
            else {
                pageTitles[i - 1].dataset.state = 'hidden';
                pageTitles[j - 1].dataset.state = 'visible';
            }
            delay(5).then(function () {
                displayGoUpButton();
            });
        });
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
        delay(5).then(function () {
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
        });
    }
    function addSwipeListeners() {
        if (nextOrPrevPage)
            delay(300).then(function () {
                nextOrPrevPage.addEventListener('touchstart', touchStart);
                nextOrPrevPage.addEventListener('touchend', swipe);
            });
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
            gotoNextPage();
        else if (swipeCoord > 50 && j != 0)
            gotoPreviousPage();
    }
    function hideElastic() {
        delay(600).then(function () {
            leftElastic.style.width = '0';
            rightElastic.style.width = '0';
        });
    }
    var classSizeRef = function () {
        if (j == 3) {
            furtherDiscussion.className = 'custom-scroll-bar translate-out-right';
            pageTitles[2].dataset.state = 'hidden';
            goUpButtons[2].className = 'scale-down';
            j = 2;
            i = 1;
            gotoPreviousPage();
        }
    };
    Q('#semi-interquartile-range-ref').onclick = classSizeRef;
    Q('#the-percentiles-ref').onclick = classSizeRef;
    Q('#quartiles-median-ref').onclick = classSizeRef;
    Q('#link-to-median').onclick = classSizeRef;
    Q('#take-example').onclick = function (e) {
        e.preventDefault();
        gotoNextPage();
    };
}
