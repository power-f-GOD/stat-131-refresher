//This code block handles the display, slide effects etc. of the whole app and...

//Sign-out script event handler
export function loadPageNavScript() {
  let i = 0;
  let j = 0;

  //handle keyboard event on when user presses (left|right) arrow keys
  document.body.onkeyup = (e: any) => {
    let key = e.keyCode || e.which;

    if (key == 39 && j != numOfPages - 1) nextButton.click();
    else if (key == 37 && j !== 0) previousButton.click();
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

  signOutButton.onclick = () => {
    signOutButton.textContent = 'Signing out...';
    signOutButton.style.width = 'auto';
    signOutButton.style.padding = '10px 20px';
    Q('#pageUp3')!.className = 'scale-down';

    if (localStorage.userId) username = localStorage.userId;

    i = 0;
    j = 0;

    //Page slide
    setTimeout(() => {
      Q('#buttons-wrapper')!.className = 'slide-down-controls';
      Q('#fixedTop3')!.className = 'slide-up';
      previousButton.className = 'scale-down';

      setTimeout(() => {
        furtherDiscussion.className = 'custom-scroll-bar translate-out-left';
        setTimeout(() => {
          signInPage.className = 'custom-scroll-bar translate-in';
          signOutButton.textContent = 'Sign Out';
        }, 500);
      }, 1300);
    }, 1700);
  };

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

    currentPage.className = 'custom-scroll-bar translate-out-left';
    nextPage.className = 'custom-scroll-bar translate-in';

    if (j == numOfPages - 1) {
      nextButton.className = 'scale-down';
      previousButton.className = 'scale-up';
    } else if (j == 0) {
      nextButton.className = 'scale-up';
      previousButton.className = 'scale-down';
    } else {
      nextButton.className = 'scale-up';
      previousButton.className = 'scale-up';
    }

    //displays current page number
    pageNumber.textContent = j + 1 + ' / ' + numOfPages;

    //This code-block is mainly for the fixed top div and partly for the page-up buttons
    if (j == 0) {
      Q(`#${pageUpButtons[j + 1]}`)!.className = 'scale-down';
      // for (let n = 1; n < fixedTops.length; n++) {
      //   Q(`#${pageUpButtons[n]}`)!.className = 'scale-down';
      //   Q(`#${fixedTops[n]}`)!.className = 'slide-up';
      // }
    }
    else if (j == 1 && i == 0) {
      Q(`#${fixedTops.slice(-1)}`)!.className = 'slide-up';
      Q(`#${fixedTops[j]}`)!.className = 'slide-down';
    } else if (j - i == 1 && true) {
      Q(`#${fixedTops[i]}`)!.className = 'slide-up';
      Q(`#${fixedTops[j]}`)!.className = 'slide-down';
    } else if (j - i < 1) {
      Q(`#${fixedTops[i]}`)!.className = 'slide-down';
      Q(`#${fixedTops[1]}`)!.className = 'slide-up';
    }

    setTimeout(displayPageUpButton, 200);
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
    currentPage.className = 'custom-scroll-bar translate-out-right';
    previousPage.className = 'custom-scroll-bar translate-in';

    if (j == numOfPages - 1) {
      nextButton.className = 'scale-down';
      previousButton.className = 'scale-up';
    } else if (j == 0) {
      nextButton.className = 'scale-up';
      previousButton.className = 'scale-down';
    } else {
      nextButton.className = 'scale-up';
      previousButton.className = 'scale-up';
    }

    previousButton.style.display = 'inline-flex';

    //displays current page number
    pageNumber.textContent = `${j + 1} / ${numOfPages}`;

    //This code-block is mainly for the fixed top div and partly for the page-up buttons
    if (j == 0)
      for (let n = 1; n < fixedTops.length; n++) {
        Q(`#${pageUpButtons[n]}`)!.className = 'scale-down';
        Q(`#${fixedTops[n]}`)!.className = 'slide-up';
      }
    else if (j == fixedTops.length - 1 && i == 0) {
      Q(`#${fixedTops[1]}`)!.className = 'slide-up';
      Q(`#${fixedTops[j]}`)!.className = 'slide-down';
    } else if (j - i != 1 && j != fixedTops.length - 1) {
      Q(`#${fixedTops[i]}`)!.className = 'slide-up';
      Q(`#${fixedTops[j]}`)!.className = 'slide-down';
    } else if (j - i == 1) {
      Q(`#${fixedTops[i]}`)!.className = 'slide-up';
      Q(`#${fixedTops.slice(-1)}`)!.className = 'slide-down';
    }

    setTimeout(displayPageUpButton, 200);
  };

  //setting variables for swipe event
  let startSwipe = 0;
  let swipeCoord = 0;

  //attaching events to respective pages for swipe event
  addSwipeListeners();

  //remove swipe listeners for elements that have horizontal scrollable content
  QAll('.prevent-swipe').forEach(el => {
    el.addEventListener('scroll', removeSwipeListeners);
    el.addEventListener('touchend', () => {
      setTimeout(addSwipeListeners, 100);
    });
  });
  QAll('.custom-scroll-bar').forEach(el => {
    el.addEventListener('scroll', removeSwipeListeners);
    el.addEventListener('touchend', () => {
      setTimeout(addSwipeListeners, 100);
    });
  });

  function addSwipeListeners() {
    pageNames.forEach(name => {
      Q(`#${name}`)!.addEventListener('touchstart', touch);
      Q(`#${name}`)!.addEventListener('touchend', swipe);
    });
  }

  function removeSwipeListeners() {
    pageNames.forEach(name => {
      Q(`#${name}`)!.removeEventListener('touchstart', touch);
      Q(`#${name}`)!.removeEventListener('touchend', swipe);
    });
    leftElastic.style.width = '0';
    rightElastic.style.width = '0';
  }

  const leftElastic = Q('#left-elastic') as HTMLDivElement;
  const rightElastic = Q('#right-elastic') as HTMLDivElement;

  //touchstart event handler
  function touch(event: any) {
    startSwipe = event.changedTouches[0].clientX;

    if (Math.abs(swipeCoord) > 25)
      if (j == 0) {
        leftElastic.style.width = '10rem';
      } else if (j == numOfPages - 1) {
        rightElastic.style.width = '10rem';
      }
  }

  //touchend event handler
  function swipe(event: any) {
    swipeCoord = event.changedTouches[0].clientX - startSwipe;
    leftElastic.style.width = '0';
    rightElastic.style.width = '0';

    if (event.touches.length > 1) return;

    //checks to prevent from sliding to next page on page-scroll-Y
    if (swipeCoord < -50 && j != numOfPages - 1) nextButton.click();
    if (swipeCoord > 50 && j != 0) previousButton.click();
  }

  //attaching onscroll event to respective pages
  for (let p = 1; p < numOfPages; p++)
    Q(`#${pageNames[p]}`)!.addEventListener('scroll', displayPageUpButton);

  //onscroll event handler
  function displayPageUpButton() {
    let scrollPosition = Q(`#${pageNames[j]}`)!.scrollTop;
    let currentPageUpButton = Q(`#${pageUpButtons[j]}`)!;
    let nextOrPrevPageUpButton = Q(`#${pageUpButtons[i]}`)!;

    if (j == 0) return;

    //ensures page-up buttons don't pop-up unexpectedly before re-appearing
    if (scrollPosition <= 1000 && currentPageUpButton.className == '') return;

    //displays page-up buttons on scroll
    if (scrollPosition > 1000) {
      if (i == 0 && j == 1) {
        Q(`#${pageUpButtons.slice(-1)}`)!.className = 'scale-down';
        currentPageUpButton.className = 'scale-up';
      } else if (j - i < 1) {
        nextOrPrevPageUpButton.className = 'scale-down';
        currentPageUpButton.className = 'scale-up';
      } else if (j - i == 1) {
        nextOrPrevPageUpButton.className = 'scale-down';
        currentPageUpButton.className = 'scale-up';
      } else if (j == pageUpButtons.length - 1 && i != 0) {
        currentPageUpButton.className = 'scale-down';
        nextOrPrevPageUpButton.className = 'scale-up';
      }
    } else {
      for (let n = 1; n < pageUpButtons.length; n++)
        Q(`#${pageUpButtons[n]}`)!.className = 'scale-down';
    }
  }

  //class size ref onclick event handler
  const classSizeRef = () => {
    if (j == 3) {
      furtherDiscussion.className = 'custom-scroll-bar translate-out-right';
      j = 1;
      i = 2;

      const currentPage = Q(`#${pageNames[i]}`) as HTMLElement;
      const refPage = Q(`#${pageNames[j]}`) as HTMLElement;
      const currentPageUpButton = Q(
        `#${pageUpButtons[3]}`
      ) as HTMLButtonElement;
      const refPageUpButton = Q(`#${pageUpButtons[j]}`) as HTMLButtonElement;

      currentPage.className = 'custom-scroll-bar translate-out-right';
      refPage.className = 'custom-scroll-bar translate-in';
      refPageUpButton.className = 'scale-up';
      currentPageUpButton.className = 'scale-down';
    }
  };

  Q('#semi-interquartile-range-ref')!.onclick = classSizeRef;
  Q('#the-percentiles-ref')!.onclick = classSizeRef;
  Q('#quartiles-median-ref')!.onclick = classSizeRef;
  Q('#link-to-median')!.onclick = classSizeRef;

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
      currentPage.className = 'custom-scroll-bar translate-out-left';
      refPage.className = 'custom-scroll-bar translate-in';
      refPageUpButton.className = 'scale-up';
      currentPageUpButton.className = 'scale-down';
    }
  };
  Q('#take-example')!.onclick = takeExampleRef;
}
