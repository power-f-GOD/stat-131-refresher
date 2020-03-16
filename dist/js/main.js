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
this.addEventListener('load', function () {
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
            setTimeout(function () {
                signInPage.className = 'translate';
                signInStatus.textContent = '';
                username.value = '';
                setTimeout(function () {
                    signInPage.style.display = 'none';
                    welcomePage.style.display = 'flex';
                    welcomePage.className = 'welcomePageFadeIn';
                    setTimeout(function () {
                        Q('#buttons-wrapper').className = 'slideUpControls';
                        setTimeout(function () {
                            nextButton.className = 'scaleUp';
                        }, 2500);
                    }, 500);
                }, 400);
            }, 2000);
            for (var i = 0; i < QAll('.username').length; i++)
                QAll('.username')[i].textContent =
                    _username.slice(0, 1).toUpperCase() +
                        _username.slice(1).toLowerCase();
        }
    };
    if (localStorage.userId)
        username.value = localStorage.userId;
    (function (i, j) {
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
                setTimeout(function () {
                    furtherDiscussion.className = 'translate';
                    setTimeout(function () {
                        signInPage.className = 'fadeIn';
                        signInPage.style.display = 'flex';
                        signOutButton.textContent = 'Sign Out';
                    }, 500);
                }, 1300);
            }, 1700);
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
            currentPage.className = 'translate';
            currentPage.style.zIndex = '2';
            nextPage.style.zIndex = '1';
            setTimeout(function () {
                nextPage.style.display = 'flex';
                nextPage.className = 'fadeIn';
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
            else if (j - i == 1 && j != 1) {
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
            previousPage.style.display = 'flex';
            previousPage.className = 'translateBack';
            previousPage.style.zIndex = '2';
            setTimeout(function () {
                currentPage.style.display = 'none';
                currentPage.className = '';
                previousPage.className = '';
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
        };
        var startSwipe = 0;
        var swipeCoord = 0;
        for (var k = 0; k < numOfPages; k++) {
            Q("#" + pageNames[k]).addEventListener('touchstart', touch);
            Q("#" + pageNames[k]).addEventListener('touchend', swipe);
        }
        function touch(event) {
            startSwipe = event.changedTouches[0].clientX;
        }
        function swipe(event) {
            swipeCoord = event.changedTouches[0].clientX - startSwipe;
            if (swipeCoord < -105 && j != numOfPages - 1)
                nextButton.click();
            if (swipeCoord > 105 && j != 0)
                previousButton.click();
        }
        for (var p = 1; p < numOfPages; p++)
            Q("#" + pageNames[p]).addEventListener('scroll', scroll);
        function scroll() {
            var scrollPosition = Q("#" + pageNames[j]).scrollTop;
            if (j == 0)
                return;
            if (scrollPosition <= 1000 && Q("#" + pageUpButtons[j]).className == '')
                return;
            if (scrollPosition > 1000) {
                if (j == pageUpButtons.length - 1 && i == 0) {
                    Q("#" + pageUpButtons[i + 1]).style.zIndex = '1';
                    Q("#" + pageUpButtons[j]).className = 'scaleUp';
                    Q("#" + pageUpButtons[j]).style.zIndex = '0';
                    setTimeout(function () {
                        Q("#" + pageUpButtons[j]).style.zIndex = '1';
                        Q("#" + pageUpButtons[i + 1]).className = 'scaleDown';
                        Q("#" + pageUpButtons[i + 1]).style.zIndex = '0';
                    }, 300);
                }
                else if (j == 1 && i == 0) {
                    (Q("#" + pageUpButtons[pageUpButtons.length - 1]).style.zIndex =
                        '1'),
                        (Q("#" + pageUpButtons[j]).className = 'scaleUp');
                    Q("#" + pageUpButtons[j]).style.zIndex = '0';
                    setTimeout(function () {
                        Q("#" + pageUpButtons[j]).style.zIndex = '1';
                        Q("#" + pageUpButtons[pageUpButtons.length - 1]).className =
                            'scaleDown';
                        Q("#" + pageUpButtons[pageUpButtons.length - 1]).style.zIndex =
                            '0';
                    }, 300);
                }
                else if (j - i < 1) {
                    Q("#" + pageUpButtons[j + 1]).style.zIndex = '1';
                    Q("#" + pageUpButtons[j]).className = 'scaleUp';
                    Q("#" + pageUpButtons[j]).style.zIndex = '0';
                    setTimeout(function () {
                        Q("#" + pageUpButtons[j]).style.zIndex = '1';
                        Q("#" + pageUpButtons[j + 1]).className = 'scaleDown';
                        Q("#" + pageUpButtons[j + 1]).style.zIndex = '0';
                    }, 300);
                }
                else if (j - i == 1) {
                    Q("#" + pageUpButtons[i]).style.zIndex = '1';
                    Q("#" + pageUpButtons[j]).className = 'scaleUp';
                    Q("#" + pageUpButtons[j]).style.zIndex = '0';
                    setTimeout(function () {
                        Q("#" + pageUpButtons[j]).style.zIndex = '1';
                        Q("#" + pageUpButtons[i]).className = 'scaleDown';
                        Q("#" + pageUpButtons[i]).style.zIndex = '0';
                    }, 300);
                }
                else if (j == pageUpButtons.length - 1 && i != 0) {
                    Q("#" + pageUpButtons[j]).style.zIndex = '1';
                    Q("#" + pageUpButtons[i]).className = 'scaleUp';
                    Q("#" + pageUpButtons[i]).style.zIndex = '0';
                    setTimeout(function () {
                        Q("#" + pageUpButtons[i]).style.zIndex = '1';
                        Q("#" + pageUpButtons[j]).className = 'scaleDown';
                        Q("#" + pageUpButtons[j]).style.zIndex = '0';
                    }, 300);
                }
            }
            else
                for (var n = 1; n < pageUpButtons.length; n++)
                    Q("#" + pageUpButtons[n]).className = 'scaleDown';
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
        Q('#myName').textContent = '@Power\'f-GOD ⚡⚡';
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
    })(0, 0);
    var TABLE = {
        FREQUENCY: function (frequencies) {
            var _frequencies = frequencies.split(/\D+/).map(function (d) { return +d; });
            return Number(_frequencies[1]) ? _frequencies : null;
        },
        INTERVAL: function (intervals, numFrequencies) {
            var classIntervals = [[]];
            var firstClassLimits = intervals
                .split(/[^.\d+]/)
                .filter(Boolean)
                .map(function (d) { return +d; });
            var C;
            if (isNaN(firstClassLimits[1]) || !numFrequencies) {
                return null;
            }
            else if (/\./.test(String(firstClassLimits[0])) ||
                /\./.test(String(firstClassLimits[1]))) {
                classIntervals[0][0] = firstClassLimits[0];
                classIntervals[0][1] = firstClassLimits[1];
            }
            else {
                classIntervals[0][0] = firstClassLimits[0];
                classIntervals[0][1] = firstClassLimits[1];
            }
            C = classIntervals[0][1] - classIntervals[0][0] + 1;
            for (var i = 1; i < numFrequencies; i++) {
                var classLimit = [];
                if (/\./.test(String(classIntervals[0][0])) ||
                    /\./.test(String(classIntervals[0][1]))) {
                    classLimit.push(classIntervals[0][0] + i * C);
                    classLimit.push(classIntervals[0][1] + i * C);
                }
                else {
                    classLimit.push(classIntervals[0][0] + i * C);
                    classLimit.push(classIntervals[0][1] + i * C);
                }
                classIntervals.push(classLimit);
            }
            return classIntervals;
        }
    };
    var STAT131 = {
        MAX: function (numbers) {
            var max = -Infinity;
            for (var i = 0; i < numbers.length; i++)
                if (numbers[i] >= max)
                    max = numbers[i];
            return max;
        },
        MEAN: function (classIntervals, f) {
            var numFrequencies = f.length;
            var tableIsReadyForPopulation = !!Q('#table-class-mark');
            var C = classIntervals[0][1] - classIntervals[0][0] + 1;
            var mean;
            var Ef = 0;
            var EfU = 0;
            var X = [];
            var Xi;
            var U = [];
            var Ui;
            var fU = [];
            var fiUi;
            var A;
            for (var i = 0; i < classIntervals.length; i++) {
                Xi = (classIntervals[i][0] + classIntervals[i][1]) / 2;
                Xi = +Xi.toFixed(1);
                X.push(Xi);
            }
            if (X.length % 2 == 1)
                A = X[X.length / 2 - 0.5];
            else
                A = X[X.length / 2];
            for (var i = 0; i < X.length; i++) {
                Ui = (X[i] - A) / C;
                if (/\./.test(String(Ui)))
                    U.push(+Ui.toFixed(1));
                else
                    U.push(Ui);
            }
            for (var i = 0; i < numFrequencies; i++) {
                fiUi = f[i] * U[i];
                fiUi = fiUi;
                fU.push(fiUi);
            }
            var cummulativeFreqCol = Q('#cummulative-frequency');
            for (var i = 0; i < numFrequencies; i++) {
                EfU += fU[i];
                Ef += f[i];
                if (tableIsReadyForPopulation)
                    cummulativeFreqCol.insertAdjacentHTML('beforeend', '<p>' + Ef + '</p>');
            }
            EfU = +EfU.toFixed(2);
            mean = A + (EfU / Ef) * C;
            if (tableIsReadyForPopulation) {
                var tableClassMarkCol = Q('#table-class-mark');
                var tableCodingMethodCol = Q('#table-coding-method');
                var tablefUCol = Q('#table-fU');
                for (var i = 0; i < numFrequencies; i++) {
                    tableClassMarkCol.insertAdjacentHTML('beforeend', '<p>' + X[i] + '</p>');
                    tableCodingMethodCol.insertAdjacentHTML('beforeend', '<p>' + U[i] + '</p>');
                    tablefUCol.insertAdjacentHTML('beforeend', '<p>' + fU[i] + '</p>');
                }
                Q('#summation-f').innerHTML = '<i>&Sigma;f<sub>i</sub></i> = ' + Ef;
                Q('#summation-fU').innerHTML =
                    '<i>&Sigma;f<sub>i</sub>U<sub>i</sub></i> = ' + EfU;
                var sumEfUperEf = (EfU / Ef).toFixed(2);
                QAll('.A').forEach(function (_A) { return (_A.textContent = String(A)); });
                QAll('.C').forEach(function (_C) { return (_C.textContent = String(C)); });
                QAll('.EfU').forEach(function (_EfU) { return (_EfU.textContent = String(EfU)); });
                QAll('.Ef').forEach(function (_Ef) { return (_Ef.textContent = String(Ef)); });
                QAll('.mean-fraction').forEach(function (_mF) { return (_mF.textContent = String(sumEfUperEf)); });
            }
            if (/\./.test(String(mean))) {
                Q('#computed-mean').textContent = mean.toFixed(2);
                return +mean.toFixed(2);
            }
            else {
                Q('#computed-mean').textContent = String(mean);
                return mean;
            }
        },
        MEDIAN: function (classIntervals, f) {
            var numFrequencies = f.length;
            var tableIsReadyForPopulation = !!Q('#table-class-mark');
            var C = classIntervals[0][1] - classIntervals[0][0] + 1;
            var median;
            var N = 0;
            var posOfMedCls = 0;
            var check = -Infinity;
            var sumFOntoMedCls = 0;
            var sumFBelowMedCls = 0;
            var Lmed;
            var freqOfMedCls;
            for (var i = 0; i < numFrequencies; i++) {
                N += f[i];
                posOfMedCls = N / 2;
            }
            var p = 0;
            while (sumFOntoMedCls > check && sumFOntoMedCls <= posOfMedCls) {
                check = sumFOntoMedCls;
                sumFOntoMedCls += f[p];
                p++;
            }
            Lmed = classIntervals[p - 1][0] - 0.5;
            sumFBelowMedCls = sumFOntoMedCls - f[p - 1];
            freqOfMedCls = f[p - 1];
            median = Lmed + ((posOfMedCls - sumFBelowMedCls) * C) / freqOfMedCls;
            if (tableIsReadyForPopulation) {
                var medianFraction_1 = ((posOfMedCls - sumFBelowMedCls) /
                    freqOfMedCls).toFixed(2);
                QAll('.Lmed').forEach(function (_Lmed) { return (_Lmed.textContent = String(Lmed)); });
                QAll('.N').forEach(function (_N) { return (_N.textContent = String(N)); });
                QAll('.EfBelow').forEach(function (_EfB) { return (_EfB.textContent = String(sumFBelowMedCls)); });
                QAll('.fmed').forEach(function (_fmed) { return (_fmed.textContent = String(freqOfMedCls)); });
                QAll('.median-fraction').forEach(function (_mF) { return (_mF.textContent = medianFraction_1); });
                Q('#computed-median').textContent = median.toFixed(2);
            }
            if (/\./.test(String(median)))
                return +median.toFixed(2);
            else
                return median;
        },
        MODE: function (classIntervals, f) {
            var e_3, _a;
            var numFrequencies = f.length;
            var tableIsReadyForPopulation = !!Q('#table-class-mark');
            var C = classIntervals[0][1] - classIntervals[0][0] + 1;
            var mode;
            var Lmod;
            var D1;
            var D2;
            var posOfModCls = f.indexOf(STAT131.MAX(f));
            Lmod = classIntervals[posOfModCls][0] - 0.5;
            if (f[posOfModCls - 1] == undefined)
                D1 = f[posOfModCls];
            else
                D1 = f[posOfModCls] - f[posOfModCls - 1];
            if (f[posOfModCls + 1] == undefined)
                D2 = f[posOfModCls];
            else
                D2 = f[posOfModCls] - f[posOfModCls + 1];
            mode = Lmod + (D1 / (D1 + D2)) * C;
            if (tableIsReadyForPopulation) {
                var boundaries = [];
                for (var i = 0; i < numFrequencies; i++) {
                    var classBoundaries = [
                        classIntervals[i][0] - 0.5,
                        classIntervals[i][1] + 0.5
                    ];
                    boundaries.push(classBoundaries);
                }
                var tableBoundariesCol = Q('#table-boundary');
                try {
                    for (var boundaries_1 = __values(boundaries), boundaries_1_1 = boundaries_1.next(); !boundaries_1_1.done; boundaries_1_1 = boundaries_1.next()) {
                        var boundary = boundaries_1_1.value;
                        tableBoundariesCol.insertAdjacentHTML('beforeend', '<p>' + boundary.join(' - ') + '</p>');
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (boundaries_1_1 && !boundaries_1_1.done && (_a = boundaries_1.return)) _a.call(boundaries_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            if (Q('#result')) {
                var modalFraction = (D1 / (D1 + D2)).toFixed(2);
                QAll('.Lmod').forEach(function (_Lmod) { return (_Lmod.textContent = String(Lmod)); });
                QAll('.D1').forEach(function (_D1) { return (_D1.textContent = String(D1)); });
                QAll('.D2').forEach(function (_D2) { return (_D2.textContent = String(D2)); });
                QAll('.mode-fraction').forEach(function (_mF) { return (_mF.textContent = String(modalFraction)); });
                Q('#computed-mode').textContent = mode.toFixed(2);
            }
            if (/\./.test(String(mode)))
                return +mode.toFixed(2);
            else
                return mode;
        }
    };
    Q('#compute').onclick = function () {
        var frequencies = TABLE.FREQUENCY(Q('#frequencies').value);
        var numFrequencies = frequencies
            ? frequencies.length
            : null;
        var classIntervals = TABLE.INTERVAL(Q('#interval').value, numFrequencies);
        var resultEl = Q('#result');
        Q('#container').style.height = 'auto';
        resultEl.className = 'fadeIn';
        if (!Q('#interval').value.trim()) {
            alert('Class intervals not set. Input class limits.');
            return;
        }
        if (!classIntervals) {
            alert('Input upper class limit.');
            return;
        }
        if (classIntervals[0][0] > classIntervals[0][1]) {
            resultEl.innerHTML =
                "<b style='color:red;'>Error! Class limits: Invalid input. Lower class limit should not be greater than upper class limit.</b>";
            return;
        }
        if (isNaN(classIntervals[0][0]) || isNaN(classIntervals[0][1])) {
            resultEl.innerHTML =
                "<b style='color:red;'>Error! Class limits: Invalid input. Delete extra decimal points.</b>";
            return;
        }
        if (!frequencies) {
            alert('Frequencies not set. Input frequencies.');
            return;
        }
        if (frequencies.length < 2) {
            alert('Length of frequency cannot be less than 2.');
            return;
        }
        if (Q('#frequencies').value.trim() && frequencies.length > 1) {
            var classIntervalsPrettyJoined = classIntervals.map(function (interval) {
                return interval.join(' - ');
            });
            resultEl.innerHTML = "\n        <div id='table-wrapper'>\n          <table id='table-data'>\n            <thead>\n              <th> Class Interval </th>\n              <th> Class Boundary </th>\n              <th><i> f<sub>i</sub> </i></th>\n              <th><i> X<sub>i</sub> </i></th>\n              <th><i> U<sub>i</sub> </i></th>\n              <th><i> f<sub>i</sub>U<sub>i</sub> </i></th>\n              <th> Cummulative Frequency </th>\n            </thead>\n            <tr>\n              <td id='table-interval'> </td>\n              <td id='table-boundary'> </td>\n              <td id='table-frequency'> </td>\n              <td id='table-class-mark'> </td>\n              <td id='table-coding-method'> </td>\n              <td id='table-fU'> </td>\n              <td id='cummulative-frequency'> </td>\n            </tr>\n            <tfoot>\n              <td> </td>\n              <td> </td>\n              <td id='summation-f'> </td>\n              <td> </td>\n              <td> </td>\n              <td id='summation-fU'> </td>\n              <td> </td>\n            </tfoot>\n          </table>\n        </div>\n      ";
            Q('#solutions-wrapper').style.display = 'flex';
            STAT131.MEAN(classIntervals, frequencies);
            STAT131.MEDIAN(classIntervals, frequencies);
            STAT131.MODE(classIntervals, frequencies);
            var tableIntervalCol = Q('#table-interval');
            var tableFrequencyCol = Q('#table-frequency');
            for (var i = 0; i < numFrequencies; i++) {
                tableIntervalCol.insertAdjacentHTML('beforeend', '<p>' + classIntervalsPrettyJoined[i] + '</p>');
                tableFrequencyCol.insertAdjacentHTML('beforeend', '<p>' + frequencies[i] + '</p>');
            }
        }
    };
    var clearResults = function () {
        var tableWrapper = Q('#table-wrapper');
        if (tableWrapper) {
            Q('#solutions-wrapper').style.display = 'none';
            tableWrapper.style.opacity = '0';
        }
        setTimeout(function () {
            Q('#result').innerHTML =
                "In the input boxes above, for the first, input the class limits of\
				only the first class. You don't have to input the limits for all the classes. And for the\
				second, input the frequencies of all the classes respectively. Don't forget\
				to separate the values you input ('23' is not same as \
				'2 3', you know). <br /> <i>Note: For full width of table when result is displayed, rotate screen. </i>;)";
            Q('#result').className = 'tableFadeIn';
        }, 500);
    };
    Q('#interval').oninput = clearResults;
    Q('#frequencies').oninput = clearResults;
});
