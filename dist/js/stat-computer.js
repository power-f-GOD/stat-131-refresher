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
export function loadStatComputerScript() {
    var TABLE = {
        FREQUENCY: function (frequencies) {
            var _frequencies = frequencies.split(/\D+/).map(Number);
            return _frequencies;
        },
        INTERVAL: function (intervals, numFrequencies) {
            var classIntervals = [[]];
            var firstClassLimits = intervals
                .split(/[^.\d+]/)
                .filter(Boolean)
                .map(Number);
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
            var xLen = X.length;
            if (xLen % 2 == 1)
                A = X[xLen / 2 - 0.5];
            else
                A = X[xLen / 2];
            for (var i = 0; i < xLen; i++) {
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
                var sumEfUperEf_1 = (EfU / Ef).toFixed(2);
                QAll('.A').forEach(function (_A) { return (_A.textContent = String(A)); });
                QAll('.C').forEach(function (_C) { return (_C.textContent = String(C)); });
                QAll('.EfU').forEach(function (_EfU) { return (_EfU.textContent = String(EfU)); });
                QAll('.Ef').forEach(function (_Ef) { return (_Ef.textContent = String(Ef)); });
                QAll('.mean-fraction').forEach(function (_mF) { return (_mF.textContent = String(sumEfUperEf_1)); });
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
            var e_1, _a;
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
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (boundaries_1_1 && !boundaries_1_1.done && (_a = boundaries_1.return)) _a.call(boundaries_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (Q('#result')) {
                var modalFraction_1 = (D1 / (D1 + D2)).toFixed(2);
                QAll('.Lmod').forEach(function (_Lmod) { return (_Lmod.textContent = String(Lmod)); });
                QAll('.D1').forEach(function (_D1) { return (_D1.textContent = String(D1)); });
                QAll('.D2').forEach(function (_D2) { return (_D2.textContent = String(D2)); });
                QAll('.mode-fraction').forEach(function (_mF) { return (_mF.textContent = String(modalFraction_1)); });
                Q('#computed-mode').textContent = mode.toFixed(2);
            }
            if (/\./.test(String(mode)))
                return +mode.toFixed(2);
            else
                return mode;
        }
    };
    Q('#compute').onclick = function () {
        var intervalInputVals = intervalInput.value.trim();
        var frequenciesInputVals = frequenciesInput.value.trim();
        var frequencies = TABLE.FREQUENCY(frequenciesInputVals);
        var numFrequencies = frequencies
            ? frequencies.length
            : null;
        var classIntervals = TABLE.INTERVAL(intervalInputVals, numFrequencies);
        var resultEl = Q('#result');
        var errMsg;
        Q('#container').style.height = 'auto';
        resultEl.className = 'bad-input-feedback';
        if (!intervalInputVals) {
            errMsg = 'Class intervals not set. Input class limits.';
            resultEl.textContent = errMsg;
            alert(errMsg);
            return;
        }
        if (!intervalInputVals.split(/\D+/)[1]) {
            errMsg = 'Input upper class limit.';
            resultEl.textContent = errMsg;
            alert(errMsg);
            Q('#interval').focus();
            return;
        }
        if (!frequenciesInputVals) {
            errMsg = 'Frequencies not set. Input frequencies.';
            resultEl.textContent = errMsg;
            alert(errMsg);
            Q('#frequencies').focus();
            return;
        }
        if (frequencies.length < 2) {
            errMsg = 'Length of frequency ought not be less than 2.';
            resultEl.textContent = errMsg;
            alert(errMsg);
            return;
        }
        if (!classIntervals ||
            isNaN(classIntervals[0][0]) ||
            isNaN(classIntervals[0][1])) {
            resultEl.innerHTML =
                'Error: Invalid class limits input. Check your inputs and try again.';
            return;
        }
        if (classIntervals[0][0] >= classIntervals[0][1]) {
            resultEl.innerHTML = "Error: Invalid input for class limits. Lower class limit, " + classIntervals[0][0] + ", cannot be greater than or equal to upper class limit, " + classIntervals[0][1] + ".<br />Input limits like \"35, 45\"";
            return;
        }
        if (frequenciesInputVals && frequencies.length > 1) {
            var classIntervalsPrettyJoined = classIntervals.map(function (interval) {
                return interval.join(' - ');
            });
            if (navigator.cookieEnabled) {
                localStorage.interval = intervalInputVals;
                localStorage.frequencies = frequenciesInputVals;
            }
            resultEl.innerHTML = "\n        <div id='table-wrapper'>\n          <table id='table-data'>\n            <thead>\n              <th> Class Interval </th>\n              <th> Class Boundary </th>\n              <th><i> f<sub>i</sub> </i></th>\n              <th><i> X<sub>i</sub> </i></th>\n              <th><i> U<sub>i</sub> </i></th>\n              <th><i> f<sub>i</sub>U<sub>i</sub> </i></th>\n              <th> Cummulative Frequency </th>\n            </thead>\n            <tr>\n              <td id='table-interval'> </td>\n              <td id='table-boundary'> </td>\n              <td id='table-frequency'> </td>\n              <td id='table-class-mark'> </td>\n              <td id='table-coding-method'> </td>\n              <td id='table-fU'> </td>\n              <td id='cummulative-frequency'> </td>\n            </tr>\n            <tfoot>\n              <td> </td>\n              <td> </td>\n              <td id='summation-f'> </td>\n              <td> </td>\n              <td> </td>\n              <td id='summation-fU'> </td>\n              <td> </td>\n            </tfoot>\n          </table>\n        </div>\n      ";
            resultEl.className = 'table-slide-in custom-scroll-bar prevent-swipe';
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
    var clearResults = function (e) {
        var tableWrapper = Q('#table-wrapper');
        if (tableWrapper) {
            Q('#solutions-wrapper').style.display = 'none';
            tableWrapper.className = 'table-fade-out';
        }
        if (e.keyCode == 13 || e.which == 13) {
            Q('#compute').click();
            e.target.blur();
            return;
        }
        Q('#result').className = 'custom-scroll-bar prevent-swipe';
        delay(650).then(function () {
            Q('#result').innerHTML = "In the input boxes above, for the first, input the class limits of\
				only the first class. You don't have to input the limits for all the classes. And for the\
				second, input the frequencies of all the classes respectively. Don't forget\
				to separate the values you input ('23' is not same as \
				'2 3', you know). <br /> <i>Note: For full width of table when result is displayed, rotate screen. </i>;)";
        });
    };
    Q('#interval').onkeyup = clearResults;
    Q('#frequencies').onkeyup = clearResults;
}
