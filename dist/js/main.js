"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var Q = document.querySelector.bind(document);
var QAll = document.querySelectorAll.bind(document);
var signInPage = Q('#sign-in-page');
var signInButton = Q('#sign-in');
var username = Q('#username');
var signInStatus = Q('#sign-in-success');
var nextButton = Q('#next');
var previousButton = Q('#previous');
var welcomePage = Q('#welcome-page');
var signOutButton = Q('#sign-out');
var pageNumber = Q('#pageNum');
var furtherDiscussion = Q('#further-discussion');
this.addEventListener('load', function () {
    if (!/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i.test(window.navigator.userAgent))
        document.body.classList.add('desktop');
    else
        document.body.classList.remove('desktop');
    var userExists = false;
    if (navigator.cookieEnabled)
        for (var i in localStorage)
            if (i == 'userId') {
                userExists = true;
                break;
            }
            else
                continue;
    var validCharsList = 'abcdefghijklmnopqrstuvwxyz'.split('');
    signInButton.onclick = function () {
        var e_1, _a, e_2, _b;
        var _username = username.value.trim();
        if (localStorage)
            localStorage.userId = _username;
        var userChars = [];
        if (_username == '') {
            alert('No name.\n\nYou have to input your name to sign in.');
            username.value = '';
            return;
        }
        if (_username.length < 2) {
            alert('Your real name is not a character long.\n\nInput your name.');
            return;
        }
        if (_username) {
            try {
                for (var validCharsList_1 = __values(validCharsList), validCharsList_1_1 = validCharsList_1.next(); !validCharsList_1_1.done; validCharsList_1_1 = validCharsList_1.next()) {
                    var validChar = validCharsList_1_1.value;
                    try {
                        for (var _c = (e_2 = void 0, __values(_username.split(''))), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var userChar = _d.value;
                            if (userChar.toLowerCase() == validChar)
                                userChars.push(userChar);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (validCharsList_1_1 && !validCharsList_1_1.done && (_a = validCharsList_1.return)) _a.call(validCharsList_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (userChars.length < _username.length) {
                alert('Invalid input. \n\nInput a name [your name]. No nicks or symbols allowed.');
                username.value = '';
                return;
            }
            signInStatus.textContent = "" + _username
                .slice(0, 1)
                .toUpperCase() + _username
                .slice(1)
                .toLowerCase() + ", you are now signed in. Welcome.";
            loadPageNavScript().then(function () {
                loadStatComputerScript();
            });
            setTimeout(function () {
                welcomePage.style.overflowY = 'hidden';
                signInPage.style.overflowY = 'hidden';
                signInPage.className = 'translate';
                signInStatus.textContent = '';
                username.value = '';
                setTimeout(function () {
                    signInPage.style.display = 'none';
                    welcomePage.style.display = 'flex';
                    welcomePage.style.overflowY = 'auto';
                    welcomePage.className = 'welcomePageFadeIn custom-scroll-bar';
                    setTimeout(function () {
                        Q('#buttons-wrapper').className = 'slideUpControls';
                        setTimeout(function () {
                            nextButton.className = 'scaleUp';
                        }, 1200);
                    }, 300);
                }, 400);
            }, 1200);
            for (var i = 0; i < QAll('.username').length; i++)
                QAll('.username')[i].textContent =
                    _username.slice(0, 1).toUpperCase() +
                        _username.slice(1).toLowerCase();
        }
    };
    var start = 2000;
    var id = requestAnimationFrame(step);
    function step(timestamp) {
        if (!start)
            start = timestamp;
        var progress = timestamp - start;
        if (progress < 2100 && progress > 2000) {
            console.log('something just happened!', progress);
            requestAnimationFrame(step);
        }
        if (progress > 2500) {
            console.log('something just cancelled!', progress);
            cancelAnimationFrame(id);
        }
    }
    if (localStorage.userId)
        username.value = localStorage.userId;
    function loadPageNavScript() {
        return import('./page-navigation.js').then(function (module) { return module.loadPageNavScript(); });
    }
    function loadStatComputerScript() {
        return import('./stat-computer.js').then(function (module) { return module.statComputerScript(); });
    }
});
