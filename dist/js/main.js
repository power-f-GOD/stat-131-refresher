"use strict";
var Q = document.querySelector.bind(document);
var QAll = document.querySelectorAll.bind(document);
var signInPage;
var signInButton;
var usernameInput;
var signInStatus;
var nextButton;
var previousButton;
var welcomePage;
var signOutButton;
var pageNumber;
var furtherDiscussion;
var username;
this.addEventListener('load', function () {
    signInPage = Q('#sign-in-page');
    signInButton = Q('#sign-in');
    usernameInput = Q('#username');
    signInStatus = Q('#sign-in-success');
    nextButton = Q('#next');
    previousButton = Q('#previous');
    welcomePage = Q('#welcome-page');
    signOutButton = Q('#sign-out');
    pageNumber = Q('#pageNum');
    furtherDiscussion = Q('#further-discussion');
    if (!/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i.test(window.navigator.userAgent))
        document.body.classList.add('desktop');
    else
        document.body.classList.remove('desktop');
    var userExists = false;
    var inputIsValid = true;
    if (navigator.cookieEnabled)
        for (var i in localStorage)
            if (i == 'userId') {
                userExists = true;
                break;
            }
            else
                continue;
    if (!userExists)
        alert("Hi, there! Good day. \n\nThis offline web-app was made to serve as a refresher for our upcoming STAT131 test. And it also may serve as a study guide for our mates that just joined us, because they are the ones I target and were the ones I had in mind before embarking on creating this so they be not oblivious of the topics herein but have a comprehension of them and fare well for short is the time. \n\nOk. Also, If you don't fully/really understand this topic, I urge you to follow, carefully, through the explanations and elaborations and try to understand the concepts for thy profiting. ;) \n\nPS: The contents of this app is subject to mistakes, errors and flaws and that's why I now advice that you authenticate whatever you read herein with a good Stats. Text or the recommended one. \n\nAlright. Godspeed. ;) \n\nDon't forget to forward this web-app to any of your friends who offers or offer STAT131 and just resumed. You could be lending a helping hand. :)");
    usernameInput.onkeyup = function (e) {
        if (e.keyCode == 13 || e.which == 13) {
            usernameInput.blur();
            signInButton.click();
        }
        inputIsValid = !/\W|\d/.test(usernameInput.value.trim());
        if (!inputIsValid)
            usernameInput.classList.add('bad-input');
        else
            usernameInput.classList.remove('bad-input');
    };
    signInButton.onclick = function () {
        username = "" + usernameInput.value
            .trim()
            .slice(0, 1)
            .toUpperCase() + usernameInput.value
            .trim()
            .slice(1)
            .toLowerCase();
        if (!username) {
            alert('No name.\n\nYou have to input your name to sign in.');
            usernameInput.value = '';
            return;
        }
        if (username.length < 2) {
            alert('Your real name is not a character long.\n\nInput your name.');
            return;
        }
        if (username) {
            if (!inputIsValid) {
                alert('Invalid input. \n\nInput a name [your name]. No nicks, numbers or symbols allowed.');
                return;
            }
            signInStatus.textContent = username + ", you are now signed in. Welcome.";
            if (localStorage)
                localStorage.userId = username;
            setTimeout(function () {
                signInPage.className = 'custom-scroll-bar translate-out-left';
                signInStatus.textContent = '';
                setTimeout(function () {
                    welcomePage.className = 'welcome-page-fade-in custom-scroll-bar';
                    setTimeout(function () {
                        Q('#buttons-wrapper').className = 'slide-up-controls';
                        setTimeout(function () {
                            nextButton.className = 'scale-up';
                        }, 1500);
                    }, 300);
                }, 400);
            }, 1200);
            for (var i = 0; i < QAll('.username').length; i++)
                QAll('.username')[i].textContent = username;
            loadPageNavScript().then(function () { return loadStatComputerScript(); });
        }
    };
    Q('#myName').textContent = "@Power'f-GOD ⚡⚡";
    if (localStorage.userId)
        usernameInput.value = localStorage.userId;
    function loadPageNavScript() {
        return import('./page-navigation.js').then(function (module) {
            return module.loadPageNavScript();
        });
    }
    function loadStatComputerScript() {
        return import('./stat-computer.js').then(function (module) {
            return module.loadStatComputerScript();
        });
    }
});
