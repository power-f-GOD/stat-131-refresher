//This code block handles the display, slide effects etc. of the whole app and...
/*This is an anonymous function to check that the variables i and j are not 
      available outside of its scope for the app to function appropriately */
//array for respective page ID's

//Sign-out script event handler
export function loadPageNavScript() {
  let i = 0;
  let j = 0;

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
    Q('#pageUp3')!.className = 'scaleDown';

    if (localStorage.userId) username.value = localStorage.userId;

    i = 0;
    j = 0;

    //Page slide
    setTimeout(() => {
      Q('#buttons-wrapper')!.className = 'slideDownControls';
      Q('#fixedTop3')!.className = 'slideUp';
      previousButton.className = 'scaleDown';
      signInPage.style.overflowY = 'hidden';
      furtherDiscussion.style.overflowY = 'hidden';
      setTimeout(() => {
        furtherDiscussion.className = 'translate';
        setTimeout(() => {
          signInPage.className = 'fadeIn custom-scroll-bar';
          signInPage.style.display = 'flex';
          signInPage.style.overflowY = 'auto';
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

    nextPage.style.overflowY = 'hidden';
    nextPage.style.zIndex = '1';
    currentPage.style.overflowY = 'hidden';
    currentPage.className = 'translate';
    currentPage.style.zIndex = '2';
    setTimeout(() => {
      nextPage.style.display = 'flex';
      nextPage.className = 'fadeIn custom-scroll-bar';
      nextPage.style.overflowY = 'auto';
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
    } else if (j - i == 1 && true) {
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
    currentPage.className = 'fadeOut';
    currentPage.style.zIndex = '1';
    currentPage.style.overflowY = 'hidden';
    previousPage.style.overflowY = 'hidden';
    previousPage.style.display = 'flex';
    previousPage.className = 'translateBack custom-scroll-bar';
    previousPage.style.zIndex = '2';

    setTimeout(() => {
      currentPage.style.display = 'none';
      currentPage.className = '';
      previousPage.style.overflowY = 'auto';
      previousPage.className = 'custom-scroll-bar';
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

    previousButton.style.display = 'inline-flex';

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
  }

  //touchstart event handler
  function touch(event: any) {
    startSwipe = event.changedTouches[0].clientX;
  }

  //touchend event handler
  function swipe(event: any) {
    swipeCoord = event.changedTouches[0].clientX - startSwipe;

    if (event.changedTouches.length > 1) return;

    //checks to prevent from sliding to next page on page-scroll-Y
    if (swipeCoord < -105 && j != numOfPages - 1) nextButton.click();
    if (swipeCoord > 105 && j != 0) previousButton.click();
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
        Q(`#${pageUpButtons.slice(-1)}`)!.className = 'scaleDown';
        setTimeout(() => {
          currentPageUpButton.className = 'scaleUp';
        }, 100);
      } else if (j - i < 1) {
        nextOrPrevPageUpButton.className = 'scaleDown';
        setTimeout(() => {
          currentPageUpButton.className = 'scaleUp';
        }, 100);
      } else if (j - i == 1) {
        nextOrPrevPageUpButton.className = 'scaleDown';
        setTimeout(() => {
          currentPageUpButton.className = 'scaleUp';
        }, 100);
      } else if (j == pageUpButtons.length - 1 && i != 0) {
        currentPageUpButton.className = 'scaleDown';
        setTimeout(() => {
          nextOrPrevPageUpButton.className = 'scaleUp';
        }, 100);
      }
    } else {
      for (let n = 1; n < pageUpButtons.length; n++)
        Q(`#${pageUpButtons[n]}`)!.className = 'scaleDown';
    }
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
  Q('#myName')!.textContent = "@Power'f-GOD ⚡⚡";

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
}
