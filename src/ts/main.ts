//DOM selectors
const Q = document.querySelector.bind(document);
const QAll = document.querySelectorAll.bind(document);

this.addEventListener('load', () => {
  const signInPage = Q('#sign-in-page') as HTMLElement;
  const signInButton = Q('#sign-in') as HTMLButtonElement;
  const username = Q('#username') as HTMLInputElement;
  const signInStatus = Q('#sign-in-success') as HTMLElement;
  const nextButton = Q('#next') as HTMLButtonElement;
  const previousButton = Q('#previous') as HTMLButtonElement;
  const welcomePage = Q('#welcome-page') as HTMLElement;
  const signOutButton = Q('#sign-out') as HTMLButtonElement;
  const pageNumber = Q('#pageNum') as HTMLElement;
  const furtherDiscussion = Q('#further-discussion') as HTMLElement;

  let userExists = false;

  if (navigator.cookieEnabled)
    for (let i in localStorage)
      if (i == 'userId') {
        userExists = true;
        break;
      } else continue;

  // if (!userExists)
  //   alert(
  //     `Hi, there! Good day. \n\nThis offline web-app was made to serve as a refresher for our upcoming STAT131 test. And it also may serve as a study guide for our mates that just joined us, because they are the ones I target and were the ones I had in mind before embarking on creating this so they be not oblivious of the topics herein but have a comprehension of them and fare well for short is the time. \n\nOk. Also, If you don't fully/really understand this topic, I urge you to follow, carefully, through the explanations and elaborations and try to understand the concepts for thy profiting. ;) \n\nPS: The contents of this app is subject to mistakes, errors and flaws and that's why I now advice that you authenticate whatever you read herein with a good Stats. Text or the recommended one. \n\nAlright. Godspeed. ;) \n\nDon't forget to forward this web-app to any of your friends who offers or offer STAT131 and just resumed. You could be lending a helping hand. :)`
  //   );

  //One of the measures to ensure user inputs letters as name
  const validCharsList: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

  //Sign-in script event handler
  signInButton.onclick = () => {
    const _username = username.value.trim();

    if (localStorage) localStorage.userId = _username;

    //Array to store valid user-input characters
    let userChars: string[] = [];

    //Condition if user hasn't inputted a value as username
    if (_username == '') {
      alert('No name.\n\nYou have to input your name to sign in.');
      username.value = '';
      return;
    }

    if (_username.length < 2) {
      alert('Your real name is not a character long.\n\nInput your name.');
      return;
    }

    //this code-block works with the preceeding line(s) of code to ensure user inputs letter names
    if (_username) {
      for (let validChar of validCharsList)
        for (let userChar of _username.split(''))
          if (userChar.toLowerCase() == validChar) userChars.push(userChar);

      if (userChars.length < _username.length) {
        alert(
          'Invalid input. \n\nInput a name [your name]. No nicks or symbols allowed.'
        );
        username.value = '';
        return;
      }

      signInStatus.textContent = `${_username
        .slice(0, 1)
        .toUpperCase()}${_username
        .slice(1)
        .toLowerCase()}, you are now signed in. Welcome.`;

      //page slide
      setTimeout(() => {
        signInPage.className = 'translate';
        signInStatus.textContent = '';
        username.value = '';
        setTimeout(() => {
          signInPage.style.display = 'none';
          welcomePage.style.display = 'flex';
          welcomePage.className = 'welcomePageFadeIn';
          setTimeout(() => {
            Q('#buttons-wrapper')!.className = 'slideUpControls';
            setTimeout(() => {
              nextButton.className = 'scaleUp';
            }, 2500);
          }, 500);
        }, 400);
      }, 2000);

      //sets username to kin'a personalize UX
      for (let i = 0; i < QAll('.username').length; i++)
        QAll('.username')[i].textContent =
          _username.slice(0, 1).toUpperCase() +
          _username.slice(1).toLowerCase();
    }
  };

  if (localStorage.userId) username.value = localStorage.userId;

  //This code block handles the display, slide effects etc. of the whole app and...
  /*This is an anonymous function to check that the variables i and j are not 
      available outside of its scope for the app to function appropriately */
  (function(i, j) {
    //Sign-out script event handler
    signOutButton.onclick = () => {
      signOutButton.textContent = 'Signing out...';
      signOutButton.style.width = 'auto';
      signOutButton.style.padding = '10px 20px';
      Q('#pageUp3')!.className = 'scaleDown';

      if (localStorage.userId) username.value = localStorage.userId;

      i = 0;
      j = 0;

      //Page slide
      setTimeout(() => {
        Q('#buttons-wrapper')!.className = 'slideDownControls';
        Q('#fixedTop3')!.className = 'slideUp';
        previousButton.className = 'scaleDown';
        setTimeout(() => {
          furtherDiscussion.className = 'translate';
          setTimeout(() => {
            signInPage.className = 'fadeIn';
            signInPage.style.display = 'flex';
            signOutButton.textContent = 'Sign Out';
          }, 500);
        }, 1300);
      }, 1700);
    };

    //array for respective page ID's
    const pageNames = [
      'welcome-page',
      'formulae-container',
      'question-solutions',
      'further-discussion'
    ];
    const numOfPages = pageNames.length;
    //ID arrays for fixed-positioned top div elements and page-up buttons respectively
    const fixedTops = [null, 'fixedTop1', 'fixedTop2', 'fixedTop3'];
    const pageUpButtons = [null, 'pageUp1', 'pageUp2', 'pageUp3'];

    //displays page number on page load
    pageNumber.textContent = '1 / ' + numOfPages;

    //next button click event handler
    nextButton.onclick = () => {
      //conditionals for page slide handling
      if (i == 0 && j == 0) {
        i = 0;
        j++;
      } else if (j == numOfPages - 1 && i == numOfPages - 2) {
        j = 0;
        i++;
      } else if (i == numOfPages - 1 && j == 0) {
        i = 0;
        j++;
      } else if (i == 0 && j == numOfPages - 1) {
        i = j;
        j = 0;
      } else if (i - j == 1) {
        i = j;
        j++;
      } else {
        i++;
        j++;
      }

      const currentPage = Q(`#${pageNames[i]}`) as HTMLElement;
      const nextPage = Q(`#${pageNames[j]}`) as HTMLElement;

      //cycles through pages: page slide
      currentPage.className = 'translate';
      currentPage.style.zIndex = '2';
      nextPage.style.zIndex = '1';
      setTimeout(() => {
        nextPage.style.display = 'flex';
        nextPage.className = 'fadeIn';
        setTimeout(() => {
          currentPage.style.display = 'none';
          currentPage.className = '';
        }, 600);
      }, 200);

      if (j == numOfPages - 1) {
        nextButton.className = 'scaleDown';
        previousButton.className = 'scaleUp';
      } else if (j == 0) {
        nextButton.className = 'scaleUp';
        previousButton.className = 'scaleDown';
      } else {
        nextButton.className = 'scaleUp';
        previousButton.className = 'scaleUp';
      }

      //displays current page number
      pageNumber.textContent = j + 1 + ' / ' + numOfPages;

      //This code-block is mainly for the fixed top div and partly for the page-up buttons
      if (j == 0)
        for (let n = 1; n < fixedTops.length; n++) {
          Q(`#${pageUpButtons[n]}`)!.className = 'scaleDown';
          Q(`#${fixedTops[n]}`)!.className = 'slideUp';
        }
      else if (j == 1 && i == 0) {
        Q(`#${fixedTops.slice(-1)}`)!.className = 'slideUp';
        setTimeout(() => {
          Q(`#${fixedTops[j]}`)!.className = 'slideDown';
          Q(`#${fixedTops.slice(-1)}`)!.className = '';
        }, 100);
      } else if (j - i == 1 && j != 1) {
        Q(`#${fixedTops[i]}`)!.className = 'slideUp';
        setTimeout(() => {
          Q(`#${fixedTops[j]}`)!.className = 'slideDown';
          Q(`#${fixedTops[i]}`)!.className = '';
        }, 100);
      } else if (j - i < 1) {
        Q(`#${fixedTops[i]}`)!.className = 'slideDown';
        setTimeout(() => {
          Q(`#${fixedTops[1]}`)!.className = 'slideUp';
          Q(`#${fixedTops[i]}`)!.className = '';
        }, 100);
      }
    };

    //previous button click event handler
    previousButton.onclick = () => {
      //conditionals for page slide handling
      if (i == 0 && j == 0) {
        i = 0;
        j = numOfPages - 1;
      } else if (i == numOfPages - 1 && j == 0) {
        i = j;
        j = numOfPages - 1;
      } else if (i == 0 && j == 1) {
        i = j;
        j--;
      } else if (i == 0 && j == numOfPages - 1) {
        i = numOfPages - 1;
        j--;
      } else if (i == 1 && j == 0) {
        j = numOfPages - 1;
        i = 0;
      } else if (i - j == -1) {
        i = j;
        j--;
      } else {
        j--;
        i--;
      }

      const currentPage = Q(`#${pageNames[i]}`) as HTMLElement;
      const previousPage = Q(`#${pageNames[j]}`) as HTMLElement;

      //cycles through pages: page slide
      currentPage.className = 'fadeOut';
      currentPage.style.zIndex = '1';
      previousPage.style.display = 'flex';
      previousPage.className = 'translateBack';
      previousPage.style.zIndex = '2';
      setTimeout(() => {
        currentPage.style.display = 'none';
        currentPage.className = '';
        previousPage.className = '';
      }, 500);

      if (j == numOfPages - 1) {
        nextButton.className = 'scaleDown';
        previousButton.className = 'scaleUp';
      } else if (j == 0) {
        nextButton.className = 'scaleUp';
        previousButton.className = 'scaleDown';
      } else {
        nextButton.className = 'scaleUp';
        previousButton.className = 'scaleUp';
      }

      previousButton.style.display = 'inline-block';

      //displays current page number
      pageNumber.textContent = `${j + 1} / ${numOfPages}`;

      //This code-block is mainly for the fixed top div and partly for the page-up buttons
      if (j == 0)
        for (let n = 1; n < fixedTops.length; n++) {
          Q(`#${pageUpButtons[n]}`)!.className = 'scaleDown';
          Q(`#${fixedTops[n]}`)!.className = 'slideUp';
        }
      else if (j == fixedTops.length - 1 && i == 0) {
        Q(`#${fixedTops[1]}`)!.className = 'slideUp';
        setTimeout(() => {
          Q(`#${fixedTops[j]}`)!.className = 'slideDown';
          Q(`#${fixedTops[1]}`)!.className = '';
        }, 100);
      } else if (j - i != 1 && j != fixedTops.length - 1) {
        Q(`#${fixedTops[i]}`)!.className = 'slideUp';
        setTimeout(() => {
          Q(`#${fixedTops[j]}`)!.className = 'slideDown';
          Q(`#${fixedTops[i]}`)!.className = '';
        }, 100);
      } else if (j - i == 1) {
        Q(`#${fixedTops[i]}`)!.className = 'slideUp';
        setTimeout(() => {
          Q(`#${fixedTops.slice(-1)}`)!.className = 'slideDown';
          Q(`#${fixedTops[i]}`)!.className = '';
        }, 100);
      }
    };

    //setting variables for swipe event
    let startSwipe = 0;
    let swipeCoord = 0;

    //attaching events to respective pages for swipe event
    for (let k = 0; k < numOfPages; k++) {
      Q(`#${pageNames[k]}`)!.addEventListener('touchstart', touch);
      Q(`#${pageNames[k]}`)!.addEventListener('touchend', swipe);
    }

    //touchstart event handler
    function touch(event: any) {
      startSwipe = event.changedTouches[0].clientX;
    }

    //touchend event handler
    function swipe(event: any) {
      swipeCoord = event.changedTouches[0].clientX - startSwipe;

      //checks to prevent from sliding to next page on page-scroll-Y
      if (swipeCoord < -105 && j != numOfPages - 1) nextButton.click();
      if (swipeCoord > 105 && j != 0) previousButton.click();
    }

    //attaching onscroll event to respective pages
    for (let p = 1; p < numOfPages; p++)
      Q(`#${pageNames[p]}`)!.addEventListener('scroll', scroll);

    //onscroll event handler
    function scroll() {
      var scrollPosition = Q(`#${pageNames[j]}`)!.scrollTop;

      if (j == 0) return;

      //ensures page-up buttons don't pop-up unexpectedly before re-appearing
      if (scrollPosition <= 1000 && Q(`#${pageUpButtons[j]}`)!.className == '')
        return;

      //displays page-up buttons on scroll
      if (scrollPosition > 1000) {
        if (j == pageUpButtons.length - 1 && i == 0) {
          Q(`#${pageUpButtons[i + 1]}`)!.style.zIndex = '1';
          Q(`#${pageUpButtons[j]}`)!.className = 'scaleUp';
          Q(`#${pageUpButtons[j]}`)!.style.zIndex = '0';
          setTimeout(() => {
            Q(`#${pageUpButtons[j]}`)!.style.zIndex = '1';
            Q(`#${pageUpButtons[i + 1]}`)!.className = 'scaleDown';
            Q(`#${pageUpButtons[i + 1]}`)!.style.zIndex = '0';
          }, 300);
        } else if (j == 1 && i == 0) {
          (Q(`#${pageUpButtons[pageUpButtons.length - 1]}`)!.style.zIndex =
            '1'),
            (Q(`#${pageUpButtons[j]}`)!.className = 'scaleUp');
          Q(`#${pageUpButtons[j]}`)!.style.zIndex = '0';
          setTimeout(() => {
            Q(`#${pageUpButtons[j]}`)!.style.zIndex = '1';
            Q(`#${pageUpButtons[pageUpButtons.length - 1]}`)!.className =
              'scaleDown';
            Q(`#${pageUpButtons[pageUpButtons.length - 1]}`)!.style.zIndex =
              '0';
          }, 300);
        } else if (j - i < 1) {
          Q(`#${pageUpButtons[j + 1]}`)!.style.zIndex = '1';
          Q(`#${pageUpButtons[j]}`)!.className = 'scaleUp';
          Q(`#${pageUpButtons[j]}`)!.style.zIndex = '0';
          setTimeout(() => {
            Q(`#${pageUpButtons[j]}`)!.style.zIndex = '1';
            Q(`#${pageUpButtons[j + 1]}`)!.className = 'scaleDown';
            Q(`#${pageUpButtons[j + 1]}`)!.style.zIndex = '0';
          }, 300);
        } else if (j - i == 1) {
          Q(`#${pageUpButtons[i]}`)!.style.zIndex = '1';
          Q(`#${pageUpButtons[j]}`)!.className = 'scaleUp';
          Q(`#${pageUpButtons[j]}`)!.style.zIndex = '0';
          setTimeout(() => {
            Q(`#${pageUpButtons[j]}`)!.style.zIndex = '1';
            Q(`#${pageUpButtons[i]}`)!.className = 'scaleDown';
            Q(`#${pageUpButtons[i]}`)!.style.zIndex = '0';
          }, 300);
        } else if (j == pageUpButtons.length - 1 && i != 0) {
          Q(`#${pageUpButtons[j]}`)!.style.zIndex = '1';
          Q(`#${pageUpButtons[i]}`)!.className = 'scaleUp';
          Q(`#${pageUpButtons[i]}`)!.style.zIndex = '0';
          setTimeout(() => {
            Q(`#${pageUpButtons[i]}`)!.style.zIndex = '1';
            Q(`#${pageUpButtons[j]}`)!.className = 'scaleDown';
            Q(`#${pageUpButtons[j]}`)!.style.zIndex = '0';
          }, 300);
          // console.log(
          //   i + ' else if ' + j + Q(`#${pageUpButtons[j]}`)!.className
          // );
        }
      } else
        for (let n = 1; n < pageUpButtons.length; n++)
          Q(`#${pageUpButtons[n]}`)!.className = 'scaleDown';
    }

    //class size ref onclick event handler
    const classSizeRef = () => {
      if (j == 3) {
        furtherDiscussion.className = 'fadeOut';
        furtherDiscussion.style.zIndex = '1';
        j = 1;
        i = 2;

        const currentPage = Q(`#${pageNames[i]}`) as HTMLElement;
        const refPage = Q(`#${pageNames[j]}`) as HTMLElement;
        const currentPageUpButton = Q(
          `#${pageUpButtons[3]}`
        ) as HTMLButtonElement;
        const refPageUpButton = Q(`#${pageUpButtons[j]}`) as HTMLButtonElement;

        currentPage.className = 'fadeOut';
        currentPage.style.zIndex = '1';
        refPage.style.display = 'flex';
        refPage.className = 'translateBack';
        refPage.style.zIndex = '2';
        setTimeout(() => {
          furtherDiscussion.style.display = 'none';
          currentPage.style.display = 'none';
          currentPage.className = '';
          refPage.className = '';
        }, 600);
        currentPageUpButton.style.zIndex = '1';
        refPageUpButton.className = 'scaleUp';
        refPageUpButton.style.zIndex = '0';
        setTimeout(() => {
          refPageUpButton.style.zIndex = '1';
          currentPageUpButton.className = 'scaleDown';
          currentPageUpButton.style.zIndex = '0';
        }, 300);
      }
    };

    Q('#semi-interquartile-range-ref')!.onclick = classSizeRef;
    Q('#the-percentiles-ref')!.onclick = classSizeRef;
    Q('#quartiles-median-ref')!.onclick = classSizeRef;
    Q('#link-to-median')!.onclick = classSizeRef;
    Q('#myName')!.textContent = '@Power\'f-GOD ⚡⚡';

    //'take-example-ref' onclick event handler on page 2
    const takeExampleRef = () => {
      if (j == 1) {
        j = 2;
        i = 1;

        const currentPage = Q(`#${pageNames[i]}`) as HTMLElement;
        const refPage = Q(`#${pageNames[j]}`) as HTMLElement;
        const currentPageUpButton = Q(
          `#${pageUpButtons[1]}`
        ) as HTMLButtonElement;
        const refPageUpButton = Q(`#${pageUpButtons[j]}`) as HTMLButtonElement;

        //cycles through the pages: page slide
        currentPage.className = 'translate';
        currentPage.style.zIndex = '1';
        refPage.style.zIndex = '2';
        setTimeout(() => {
          refPage.style.display = 'flex';
          refPage.className = 'fadeIn';
          setTimeout(() => {
            currentPage.style.display = 'none';
            currentPage.className = '';
          }, 400);
        }, 200);
        currentPageUpButton.style.zIndex = '1';
        refPageUpButton.className = 'scaleUp';
        refPageUpButton.style.zIndex = '0';
        setTimeout(() => {
          refPageUpButton.style.zIndex = '1';
          currentPageUpButton.className = 'scaleDown';
          currentPageUpButton.style.zIndex = '0';
        }, 300);
      }
    };
    Q('#take-example')!.onclick = takeExampleRef;
  })(0, 0);

  //Break Break Break Break Break Break Break Break Break Break Break Break Break
  //Break Break Break Break Break Break Break Break Break Break Break Break

  //Code for table calculation

  const TABLE = {
    FREQUENCY: (frequencies: string): number[] | null => {
      //extract and return frequencies of classes
      const _frequencies: number[] = frequencies.split(/\D+/).map(d => +d);
      return Number(_frequencies[1]) ? _frequencies : null;
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
        .map(d => +d);
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
      var max = -Infinity;

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

      // Choosing an assumed mean
      if (X.length % 2 == 1) A = X[X.length / 2 - 0.5];
      else A = X[X.length / 2];

      // Calculating coding method's "U"
      for (let i = 0; i < X.length; i++) {
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

        var sumEfUperEf = (EfU / Ef).toFixed(2);
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

        //   if (Number(classIntervals[0][0]) == Number(classIntervals[0][0]).toFixed(1))
        //	alert("what");

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
        var modalFraction = (D1 / (D1 + D2)).toFixed(2);

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
    const frequencies: number[] | null = TABLE.FREQUENCY(
      Q('#frequencies')!.value
    );
    const numFrequencies: number | null = frequencies
      ? frequencies.length
      : null;
    const classIntervals: number[][] | null = TABLE.INTERVAL(
      Q('#interval')!.value,
      numFrequencies
    );
    const resultEl = Q('#result') as HTMLElement;

    Q('#container')!.style.height = 'auto';
    resultEl.className = 'fadeIn';

    // Input check for interval input box
    if (!Q('#interval')!.value.trim()) {
      alert('Class intervals not set. Input class limits.');
      return;
    }

    // Error check for interval input box
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

    // Input check for frequencies
    if (!frequencies) {
      alert('Frequencies not set. Input frequencies.');
      return;
    }
    if (frequencies.length < 2) {
      alert('Length of frequency cannot be less than 2.');
      return;
    }

    // Outputs result
    if (Q('#frequencies')!.value.trim() && frequencies.length > 1) {
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
  const clearResults = () => {
    const tableWrapper = Q('#table-wrapper') as HTMLElement;

    if (tableWrapper) {
      Q('#solutions-wrapper')!.style.display = 'none';
      tableWrapper.style.opacity = '0';
    }

    setTimeout(() => {
      Q('#result')!.innerHTML =
        "In the input boxes above, for the first, input the class limits of\
				only the first class. You don't have to input the limits for all the classes. And for the\
				second, input the frequencies of all the classes respectively. Don't forget\
				to separate the values you input ('23' is not same as \
				'2 3', you know). <br /> <i>Note: For full width of table when result is displayed, rotate screen. </i>;)";

      Q('#result')!.className = 'tableFadeIn';
    }, 500);
  };

  Q('#interval')!.oninput = clearResults;
  Q('#frequencies')!.oninput = clearResults;
});
