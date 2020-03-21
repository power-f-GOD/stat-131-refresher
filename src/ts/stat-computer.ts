//Code for table calculation
export function loadStatComputerScript() {
  const TABLE = {
    FREQUENCY: (frequencies: string): number[] | null => {
      //extract and return frequencies of classes
      const _frequencies: number[] = frequencies.split(/\D+/).map(Number);
      return _frequencies;
    },

    INTERVAL: (
      intervals: string,
      numFrequencies: number | null
    ): number[][] | null => {
      const classIntervals: number[][] = [[]];
      //extract class limits of first class
      const firstClassLimits = intervals
        .split(/[^.\d+]/)
        .filter(Boolean)
        .map(Number);
      let C: number; // Class size

      //TO DO: Fix class limit bug

      // Stores upper and lower class limits of 1st class
      if (isNaN(firstClassLimits[1]) || !numFrequencies) {
        return null;
      } else if (
        /\./.test(String(firstClassLimits[0])) ||
        /\./.test(String(firstClassLimits[1]))
      ) {
        classIntervals[0][0] = firstClassLimits[0];
        classIntervals[0][1] = firstClassLimits[1];
      } else {
        classIntervals[0][0] = firstClassLimits[0];
        classIntervals[0][1] = firstClassLimits[1];
      }

      // Computes class size
      C = classIntervals[0][1] - classIntervals[0][0] + 1;

      // Computing class intervals
      for (let i = 1; i < numFrequencies; i++) {
        let classLimit: number[] = [];

        if (
          /\./.test(String(classIntervals[0][0])) ||
          /\./.test(String(classIntervals[0][1]))
        ) {
          classLimit.push(classIntervals[0][0] + i * C);
          classLimit.push(classIntervals[0][1] + i * C);
        } else {
          classLimit.push(classIntervals[0][0] + i * C);
          classLimit.push(classIntervals[0][1] + i * C);
        }
        classIntervals.push(classLimit);
      }
      return classIntervals;
    }
  };

  //Creating STAT131 object. 😜😜😜
  const STAT131 = {
    // Max function --- improvision ;) -------------------->
    MAX: function(numbers: number[]): number {
      let max = -Infinity;

      for (let i = 0; i < numbers.length; i++)
        if (numbers[i] >= max) max = numbers[i];
      return max;
    },

    // The mean function ------------------------->
    MEAN: function(classIntervals: number[][], f: number[]): number {
      // Declaring variables
      const numFrequencies = f.length;
      const tableIsReadyForPopulation: boolean = !!Q('#table-class-mark');
      const C = classIntervals[0][1] - classIntervals[0][0] + 1; // Class size
      let mean: number; //...is being solved :)
      let Ef = 0; // Summation f
      let EfU = 0; // Summation f of U;
      let X: number[] = [];
      let Xi: number; //ith Class Mark
      let U: number[] = [];
      let Ui: number; //ith value of U
      let fU: number[] = [];
      let fiUi: number; //ith value of f of U
      let A: number; //Assumed mean

      // Getting the class marks
      for (let i = 0; i < classIntervals.length; i++) {
        Xi = (classIntervals[i][0] + classIntervals[i][1]) / 2;
        Xi = +Xi.toFixed(1);
        X.push(Xi);
      }

      let xLen = X.length;

      // Choosing an assumed mean
      if (xLen % 2 == 1) A = X[xLen / 2 - 0.5];
      else A = X[xLen / 2];

      // Calculating coding method's "U"
      for (let i = 0; i < xLen; i++) {
        Ui = (X[i] - A) / C;
        if (/\./.test(String(Ui))) U.push(+Ui.toFixed(1));
        else U.push(Ui);
      }

      // Calculating products of 'f' and 'U'
      for (let i = 0; i < numFrequencies; i++) {
        fiUi = f[i] * U[i];
        fiUi = fiUi;
        fU.push(fiUi);
      }

      // Calculating for 'EfU' and 'Ef'
      const cummulativeFreqCol = Q('#cummulative-frequency') as HTMLElement;
      for (let i = 0; i < numFrequencies; i++) {
        EfU += fU[i];
        Ef += f[i];

        if (tableIsReadyForPopulation)
          cummulativeFreqCol.insertAdjacentHTML(
            'beforeend',
            '<p>' + Ef + '</p>'
          );
      }
      EfU = +EfU.toFixed(2);

      // Calculating mean
      mean = A + (EfU / Ef) * C;

      if (tableIsReadyForPopulation) {
        const tableClassMarkCol = Q('#table-class-mark') as HTMLElement;
        const tableCodingMethodCol = Q('#table-coding-method') as HTMLElement;
        const tablefUCol = Q('#table-fU') as HTMLElement;

        for (let i = 0; i < numFrequencies; i++) {
          tableClassMarkCol.insertAdjacentHTML(
            'beforeend',
            '<p>' + X[i] + '</p>'
          );
          tableCodingMethodCol.insertAdjacentHTML(
            'beforeend',
            '<p>' + U[i] + '</p>'
          );
          tablefUCol.insertAdjacentHTML('beforeend', '<p>' + fU[i] + '</p>');
        }

        Q('#summation-f')!.innerHTML = '<i>&Sigma;f<sub>i</sub></i> = ' + Ef;
        Q('#summation-fU')!.innerHTML =
          '<i>&Sigma;f<sub>i</sub>U<sub>i</sub></i> = ' + EfU;

        const sumEfUperEf = (EfU / Ef).toFixed(2);

        QAll('.A').forEach(_A => (_A.textContent = String(A)));
        QAll('.C').forEach(_C => (_C.textContent = String(C)));
        QAll('.EfU').forEach(_EfU => (_EfU.textContent = String(EfU)));
        QAll('.Ef').forEach(_Ef => (_Ef.textContent = String(Ef)));
        QAll('.mean-fraction').forEach(
          _mF => (_mF.textContent = String(sumEfUperEf))
        );
      }

      /* RegEx property used here to check if 'mean' is a decimal and approximates to 2 d.p.'s else returns a mean whole number */
      if (/\./.test(String(mean))) {
        Q('#computed-mean')!.textContent = mean.toFixed(2);
        return +mean.toFixed(2);
      } else {
        Q('#computed-mean')!.textContent = String(mean);
        return mean;
      }
    },

    // The median function ------------------------->
    MEDIAN: function(classIntervals: number[][], f: number[]): number {
      const numFrequencies = f.length;
      const tableIsReadyForPopulation: boolean = !!Q('#table-class-mark');
      const C = classIntervals[0][1] - classIntervals[0][0] + 1; // Class size
      let median: number; //...is being calculated. Phewww!
      let N: number = 0; // N is the summation of all frequencies
      let posOfMedCls = 0; //Position of median class
      let check: number = -Infinity;
      let sumFOntoMedCls: number = 0; // Summation of frequencies onto median class
      let sumFBelowMedCls: number = 0; //Summation of frequencies below med. class
      let Lmed: number; //Lower class boundary of median class
      let freqOfMedCls: number;

      // Getting position of median class
      for (let i = 0; i < numFrequencies; i++) {
        N += f[i];
        posOfMedCls = N / 2;
      }

      // Getting lower class boundary of median class
      let p = 0;
      while (sumFOntoMedCls > check && sumFOntoMedCls <= posOfMedCls) {
        check = sumFOntoMedCls;
        sumFOntoMedCls += f[p];
        p++;
      }

      Lmed = classIntervals[p - 1][0] - 0.5;
      // Summation of frequencies below median class
      sumFBelowMedCls = sumFOntoMedCls - f[p - 1];
      // Setting frequency of median class
      freqOfMedCls = f[p - 1];
      // Calculating median
      median = Lmed + ((posOfMedCls - sumFBelowMedCls) * C) / freqOfMedCls;

      if (tableIsReadyForPopulation) {
        let medianFraction = (
          (posOfMedCls - sumFBelowMedCls) /
          freqOfMedCls
        ).toFixed(2);

        QAll('.Lmed').forEach(_Lmed => (_Lmed.textContent = String(Lmed)));
        QAll('.N').forEach(_N => (_N.textContent = String(N)));
        QAll('.EfBelow').forEach(
          _EfB => (_EfB.textContent = String(sumFBelowMedCls))
        );
        QAll('.fmed').forEach(
          _fmed => (_fmed.textContent = String(freqOfMedCls))
        );
        QAll('.median-fraction').forEach(
          _mF => (_mF.textContent = medianFraction)
        );
        Q('#computed-median')!.textContent = median.toFixed(2);
      }

      // Return result
      if (/\./.test(String(median))) return +median.toFixed(2);
      else return median;
    },

    // The modal function ------------------------->
    MODE: (classIntervals: number[][], f: number[]): number => {
      const numFrequencies = f.length;
      const tableIsReadyForPopulation = !!Q('#table-class-mark');
      const C = classIntervals[0][1] - classIntervals[0][0] + 1; // Class size
      let mode: number; //We've got to find the mode. Come on. let's go.
      let Lmod: number; //Lower boundary of modal class.
      let D1: number; //Difference between frequencies of modal class and next lower class.
      let D2: number; //Difference between frequencies of modal class and next higher class.
      let posOfModCls = f.indexOf(STAT131.MAX(f)); // Position/index of modal class

      // Getting Lower boundary of modal class
      Lmod = classIntervals[posOfModCls][0] - 0.5;

      // Calculating D1
      if (f[posOfModCls - 1] == undefined) D1 = f[posOfModCls];
      else D1 = f[posOfModCls] - f[posOfModCls - 1];

      // Calculating D2
      if (f[posOfModCls + 1] == undefined) D2 = f[posOfModCls];
      else D2 = f[posOfModCls] - f[posOfModCls + 1];

      // Calculating mode
      mode = Lmod + (D1 / (D1 + D2)) * C;

      if (tableIsReadyForPopulation) {
        const boundaries: number[][] = [];

        for (let i = 0; i < numFrequencies; i++) {
          let classBoundaries = [
            classIntervals[i][0] - 0.5,
            classIntervals[i][1] + 0.5
          ];
          boundaries.push(classBoundaries);
        }

        const tableBoundariesCol = Q('#table-boundary') as HTMLElement;
        for (let boundary of boundaries)
          tableBoundariesCol.insertAdjacentHTML(
            'beforeend',
            '<p>' + boundary.join(' - ') + '</p>'
          );
      }

      if (Q('#result')) {
        let modalFraction = (D1 / (D1 + D2)).toFixed(2);

        QAll('.Lmod').forEach(_Lmod => (_Lmod.textContent = String(Lmod)));
        QAll('.D1').forEach(_D1 => (_D1.textContent = String(D1)));
        QAll('.D2').forEach(_D2 => (_D2.textContent = String(D2)));
        QAll('.mode-fraction').forEach(
          _mF => (_mF.textContent = String(modalFraction))
        );
        Q('#computed-mode')!.textContent = mode.toFixed(2);
      }

      // Returning result
      if (/\./.test(String(mode))) return +mode.toFixed(2);
      else return mode;
    }
  };

  //Calling functions to carry out arithmetic and output results

  Q('#compute')!.onclick = () => {
    const intervalInputVals = Q('#interval')!.value.trim();
    const frequencyInputVals = Q('#frequencies')!.value.trim();
    const frequencies: number[] = TABLE.FREQUENCY(frequencyInputVals);
    const numFrequencies: number | null = frequencies
      ? frequencies.length
      : null;
    const classIntervals: number[][] | null = TABLE.INTERVAL(
      intervalInputVals,
      numFrequencies
    )!;
    const resultEl = Q('#result') as HTMLElement;
    let errMsg;

    Q('#container')!.style.height = 'auto';
    resultEl.className = 'bad-input-feedback';

    // Input check for interval input box
    if (!intervalInputVals) {
      errMsg = 'Class intervals not set. Input class limits.';
      resultEl.textContent = errMsg;
      alert(errMsg);
      return;
    }

    // Error check for interval input box
    if (!intervalInputVals.split(/\D+/)[1]) {
      console.log(classIntervals, frequencies)
      errMsg = 'Input upper class limit.';
      resultEl.textContent = errMsg;
      alert(errMsg);
      Q('#interval')!.focus();
      return;
    }

    // Input check for frequencies
    if (!frequencyInputVals) {
      errMsg = 'Frequencies not set. Input frequencies.';
      resultEl.textContent = errMsg;
      alert(errMsg);
      Q('#frequencies')!.focus();
      return;
    }

    if (frequencies.length < 2) {
      errMsg = 'Length of frequency ought not be less than 2.';
      resultEl.textContent = errMsg;
      alert(errMsg);
      return;
    }

    if (classIntervals[0][0] >= classIntervals[0][1]) {
      resultEl.innerHTML =
        `Error: Invalid input for class limits. Lower class limit, ${classIntervals[0][0]}, cannot be greater than or equal to upper class limit, ${classIntervals[0][1]}.<br />Input limits like "35, 45"`;
      return;
    }

    if (isNaN(classIntervals[0][0]) || isNaN(classIntervals[0][1])) {
      resultEl.innerHTML = "Error: Invalid class limits input. Delete extra decimal points";
      return;
    }

    // Outputs result
    if (frequencyInputVals && frequencies.length > 1) {
      // Just for neat/clean joining of class intervals on output/display
      const classIntervalsPrettyJoined = classIntervals.map(interval =>
        interval.join(' - ')
      );

      
      resultEl.innerHTML = `
        <div id='table-wrapper'>
          <table id='table-data'>
            <thead>
              <th> Class Interval </th>
              <th> Class Boundary </th>
              <th><i> f<sub>i</sub> </i></th>
              <th><i> X<sub>i</sub> </i></th>
              <th><i> U<sub>i</sub> </i></th>
              <th><i> f<sub>i</sub>U<sub>i</sub> </i></th>
              <th> Cummulative Frequency </th>
            </thead>
            <tr>
              <td id='table-interval'> </td>
              <td id='table-boundary'> </td>
              <td id='table-frequency'> </td>
              <td id='table-class-mark'> </td>
              <td id='table-coding-method'> </td>
              <td id='table-fU'> </td>
              <td id='cummulative-frequency'> </td>
            </tr>
            <tfoot>
              <td> </td>
              <td> </td>
              <td id='summation-f'> </td>
              <td> </td>
              <td> </td>
              <td id='summation-fU'> </td>
              <td> </td>
            </tfoot>
          </table>
        </div>
      `;
      resultEl.className = 'table-slide-in custom-scroll-bar prevent-swipe';

      Q('#solutions-wrapper')!.style.display = 'flex';

      //calculate mean, median and mode and update DOM
      STAT131.MEAN(classIntervals, frequencies);
      STAT131.MEDIAN(classIntervals, frequencies);
      STAT131.MODE(classIntervals, frequencies);

      const tableIntervalCol = Q('#table-interval') as HTMLElement;
      const tableFrequencyCol = Q('#table-frequency') as HTMLElement;

      for (let i = 0; i < numFrequencies!; i++) {
        tableIntervalCol.insertAdjacentHTML(
          'beforeend',
          '<p>' + classIntervalsPrettyJoined[i] + '</p>'
        );
        tableFrequencyCol.insertAdjacentHTML(
          'beforeend',
          '<p>' + frequencies[i] + '</p>'
        );
      }
    }
  };

  // Clear result function
  const clearResults = (e: any) => {
    const tableWrapper = Q('#table-wrapper') as HTMLElement;

    if (tableWrapper) {
      Q('#solutions-wrapper')!.style.display = 'none';
      tableWrapper.className = 'table-fade-out';
    }

    if (e.keyCode == 13 || e.which == 13) {
      Q('#compute')!.click();
      e.target.blur();
      return;
    }

    
    Q('#result')!.className = 'custom-scroll-bar prevent-swipe';
    setTimeout(() => {
      Q('#result')!.innerHTML =
        "In the input boxes above, for the first, input the class limits of\
				only the first class. You don't have to input the limits for all the classes. And for the\
				second, input the frequencies of all the classes respectively. Don't forget\
				to separate the values you input ('23' is not same as \
				'2 3', you know). <br /> <i>Note: For full width of table when result is displayed, rotate screen. </i>;)";
    }, 650);
  };

  Q('#interval')!.onkeyup = clearResults;
  Q('#frequencies')!.onkeyup = clearResults;
}
