"use strict";
var Q = document.querySelector.bind(document);
var QAll = document.querySelectorAll.bind(document);
var cookieEnabled = navigator.cookieEnabled;
var pages;
var numOfPages;
var signInPage;
var usernameInput;
var signInButton;
var rememberMeCheckbox;
var signInStatus;
var installButton;
var nextButton;
var previousButton;
var welcomePage;
var signOutButton;
var pageNumber;
var pageTitleBar;
var pageTitles;
var goUpButtons;
var numOfGoUpButtons;
var intervalInput;
var frequenciesInput;
var furtherDiscussion;
var username;
var rememberMe;
var _requestAnimationFrame;
var _cancelAnimationFrame;
this.addEventListener('load', loadAppScript);
function loadAppScript() {
    _requestAnimationFrame = _requestAnimationFrameWrapper();
    _cancelAnimationFrame = _cancelAnimationFrameWrapper();
    pages = QAll('[data-role="page"]');
    numOfPages = pages.length;
    pageTitleBar = Q('#page-title-bar');
    pageTitles = QAll('.page-title');
    goUpButtons = QAll('button[aria-label="go up"]');
    numOfGoUpButtons = goUpButtons.length;
    signInPage = Q('#sign-in-page');
    usernameInput = Q('#username');
    signInButton = Q('#sign-in');
    rememberMeCheckbox = Q('#remember-me');
    signInStatus = Q('#sign-in-status');
    installButton = Q('#install');
    nextButton = Q('#next');
    previousButton = Q('#previous');
    welcomePage = Q('#welcome-page');
    signOutButton = Q('#sign-out');
    pageNumber = Q('#page-num');
    intervalInput = Q('#interval');
    frequenciesInput = Q('#frequencies');
    furtherDiscussion = Q('#further-discussion-page');
    var deferredPromptForInstall;
    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        deferredPromptForInstall = e;
        window.addEventListener('appinstalled', function () {
            return delay(1000).then(function () {
                alert('STAT 131 Refresher successfully installed. You can now launch app anytime from homescreen whether online or offline.');
            });
        });
    });
    QAll('[data-state="hidden"]').forEach(function (target) {
        target.addEventListener('transitionend', function () {
            var classNames = /translate-in|welcome-page-fade-in|scale-up|slide-down|slide-up-controls|title-bar|page-title/;
            if (!classNames.test(target.className))
                target.dataset.state = 'hidden';
        });
    });
    var isMobile = /(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i;
    if (!isMobile.test(window.navigator.userAgent))
        document.body.classList.add('desktop');
    else {
        document.body.classList.remove('desktop');
    }
    var usernameElements = QAll('.username');
    var userExists = false;
    var usernameInputIsValid = true;
    if (cookieEnabled) {
        var _rememberMe = localStorage.rememberMe;
        userExists = !!localStorage.userId;
        rememberMe = _rememberMe ? JSON.parse(_rememberMe) : false;
        if (rememberMe) {
            rememberMeCheckbox.checked = true;
        }
    }
    if (!userExists)
        alert("Hi, there! Good day. \n\nOk. This offline web-app was made to serve as a refresher for the upcoming STAT131 test. And it also may serve as a study guide for our colleagues who just joined us, because they are the ones I target and had in mind before embarking on creating this, so they be not oblivious of the topics herein but have a comprehension of them and fare well in the test to come for short is the time. \n\nAlso, if you don't fully/really understand this topic, I urge you to follow, carefully, through the explanations and elaborations and try to understand the concepts for thy profiting. ;) \n\nPS: The contents of this app may be subject to mistakes, errors and flaws and that's why I now advise that you authenticate whatever you read herein with a good Stats Text or the recommended one. And please, send a message if in case you find or notice any errors. (Link to my Facebook on sign in page)  \n\nAlright. Godspeed. ;) \n\nDon't forget to forward or share this web-app to any of your friends who offers or offer STAT131 and just resumed. You could be lending a helping hand. :)");
    usernameInput.onkeyup = function (e) {
        usernameInputIsValid = !/\W|\d/.test(usernameInput.value.trim());
        if (!usernameInputIsValid)
            usernameInput.classList.add('bad-input');
        else
            usernameInput.classList.remove('bad-input');
        signInStatus.textContent = '';
        if (e.keyCode == 13 || e.which == 13) {
            usernameInput.blur();
            signInButton.click();
        }
    };
    signInButton.onclick = function () {
        var errMsg;
        if (cookieEnabled) {
            if (rememberMeCheckbox.checked)
                localStorage.rememberMe = true;
            else
                localStorage.rememberMe = false;
        }
        signInStatus.className = 'bad-input-feedback';
        username = "" + usernameInput.value
            .trim()
            .slice(0, 1)
            .toUpperCase() + usernameInput.value
            .trim()
            .slice(1)
            .toLowerCase();
        if (!username) {
            errMsg = 'No name.\n\nYou have to input your name to sign in.';
            signInStatus.innerHTML = errMsg.replace('\n\n', '<br />');
            usernameInput.value = '';
            return alert(errMsg);
        }
        if (username.length < 2) {
            errMsg = 'Your real name is not a character long. Input your name.';
            signInStatus.innerHTML = errMsg;
            return;
        }
        if (username) {
            if (!usernameInputIsValid) {
                errMsg =
                    'Invalid input. Input a name━your name.\n\nNo numbers or symbols allowed.';
                signInStatus.innerHTML = errMsg.replace('\n\n', '<br />');
                return;
            }
            signInStatus.className = '';
            signInStatus.textContent = !rememberMe
                ? "Sign in success! Welcome, " + username + "!"
                : '';
            if (cookieEnabled)
                localStorage.userId = username;
            if (isMobile)
                Q('meta[name="viewport"]').content += ', user-scalable=no';
            delay(rememberMe ? 750 : 1500).then(function () {
                welcomePage.dataset.state = 'visible';
                signInPage.className = 'custom-scroll-bar translate-out-left';
                signInStatus.textContent = '';
                delay(350).then(function () {
                    welcomePage.className =
                        'welcome-page-fade-in custom-scroll-bar prevent-swipe';
                    Q('#buttons-wrapper').dataset.state = 'visible';
                    delay(800).then(function () {
                        Q('#buttons-wrapper').className = 'slide-up-controls';
                        nextButton.disabled = false;
                        delay(800).then(function () {
                            nextButton.className = 'scale-up';
                            previousButton.className = 'scale-up';
                            signInPage.className = 'custom-scroll-bar translate-out-right';
                            signInPage.dataset.state = 'hidden';
                            if (deferredPromptForInstall) {
                                installButton.disabled = false;
                                installButton.dataset.state = 'visible';
                                installButton.addEventListener('click', function () {
                                    deferredPromptForInstall.prompt();
                                    deferredPromptForInstall.userChoice.then(function (choiceResult) {
                                        if (choiceResult.outcome == 'accepted') {
                                            installButton.disabled = true;
                                            installButton.dataset.state = 'invisible';
                                        }
                                        deferredPromptForInstall = null;
                                    });
                                });
                            }
                        });
                    });
                });
            });
            usernameElements.forEach(function (element) { return (element.textContent = username); });
            loadPageNavScript()
                .then(function () { return loadStatComputerScript(); })
                .then(function () {
                return delay(1000).then(function () {
                    if (cookieEnabled) {
                        var activePageId_1 = localStorage.activePageId;
                        if (activePageId_1 && rememberMe) {
                            var _loop_1 = function (i, timeout) {
                                var currentPage = pages[i];
                                var scrollTop = +localStorage.activePageScrollTop;
                                if (activePageId_1 != currentPage.id) {
                                    delay((timeout += 700)).then(function () { return nextButton.click(); });
                                }
                                else {
                                    delay(timeout ? timeout : 2800).then(function () { return (Q("#" + activePageId_1).scrollTop = scrollTop); });
                                    return out_timeout_1 = timeout, "break";
                                }
                                out_timeout_1 = timeout;
                            };
                            var out_timeout_1;
                            for (var i = 0, timeout = 0; i < numOfPages; i++) {
                                var state_1 = _loop_1(i, timeout);
                                timeout = out_timeout_1;
                                if (state_1 === "break")
                                    break;
                            }
                        }
                    }
                });
            });
        }
    };
    Q('#my-name').textContent = "@Power'f-GOD⚡⚡";
    if (localStorage.userId)
        usernameInput.value = localStorage.userId;
    function loadPageNavScript() {
        return import('./page-navigation.min.js').then(function (module) {
            return module.loadPageNavScript();
        });
    }
    function loadStatComputerScript() {
        return import('./stat-computer.min.js').then(function (module) {
            return module.loadStatComputerScript();
        });
    }
    if (cookieEnabled)
        if (rememberMe)
            signInButton.click();
}
function delay(timeout) {
    return new Promise(function (resolve) {
        if (isNaN(timeout))
            throw Error('Expects a time in milliseconds as parameter.');
        var start = 0;
        var id = _requestAnimationFrame(animate);
        function animate(timestamp) {
            if (!start)
                start = timestamp;
            var timeElapsed = timestamp - start;
            if (timeElapsed < timeout)
                id = _requestAnimationFrame(animate);
            else
                resolve(id);
        }
    });
}
function customTimeout(callback, timeout) {
    if (isNaN(timeout))
        throw Error('Expects a time in milliseconds as parameter.');
    var start = 0;
    var id = _requestAnimationFrame(animate);
    function animate(timestamp) {
        if (!start)
            start = timestamp;
        var timeElapsed = timestamp - start;
        if (timeElapsed < timeout)
            id = _requestAnimationFrame(animate);
        else
            callback();
    }
    return id;
}
function customInterval(callback, interval) {
    if (!callback || isNaN(interval))
        throw Error('Two parameters expected.');
    interval = interval == 0 ? 1 : interval;
    var start = 0;
    var spy = { id: _requestAnimationFrame(animate) };
    function animate(timestamp) {
        if (!start)
            start = timestamp;
        var timeElapsed = timestamp - start;
        spy.id = _requestAnimationFrame(animate);
        if (timeElapsed % interval < 17 && timeElapsed > interval)
            callback();
    }
    return spy;
}
function _requestAnimationFrameWrapper() {
    if (window.requestAnimationFrame)
        return window.requestAnimationFrame;
    return function () {
        var previousTime = 0;
        return function (callback) {
            var timestamp = new Date().getTime();
            var timeout = Math.max(0, 16 - (timestamp - previousTime));
            var id = setTimeout(function () {
                callback(timestamp + timeout);
            }, 16);
            previousTime = timestamp + timeout;
            return id;
        };
    };
}
function _cancelAnimationFrameWrapper() {
    if (window.cancelAnimationFrame)
        return window.cancelAnimationFrame;
    return function (id) {
        clearTimeout(id);
    };
}
