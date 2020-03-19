//This code block handles the display, slide effects etc. of the whole app and...

//Sign-out script event handler
export function loadPageNavScript() {
  //variables used for navigation
  let i = 0;
  let j = 0;

  const pages = QAll('div[data-role="page"]');
  const numOfPages = pages.length;
  const pageTitleBar = Q('#page-title-bar') as HTMLDivElement;
  const pageTitles = QAll('.page-title');
  //ID arrays for fixed-positioned top div elements and page-up buttons respectively
  const goUpButtons = QAll('span[data-name="go-up-button"]');
  const numOfPageUpButtons = goUpButtons.length;

  //handle keyboard event on when user presses (left|right) arrow keys
  document.body.onkeyup = (e: any) => {
    let key = e.keyCode || e.which;

    if (key == 39 && j != numOfPages - 1) nextButton.click();
    else if (key == 37 && j !== 0) previousButton.click();
  };

  signOutButton.onclick = () => {
    signOutButton.textContent = 'Signing out...';
    Q('#pageUp3')!.className = 'scale-down';

    if (localStorage.userId) username = localStorage.userId;

    i = 0;
    j = 0;
    //Page slide
    setTimeout(() => {
      Q('#buttons-wrapper')!.className = 'slide-down-controls';
      pageTitleBar.dataset.state = 'hidden';
      previousButton.className = 'scale-down';

      setTimeout(() => {
        furtherDiscussion.className = 'custom-scroll-bar translate-out-left';
        setTimeout(() => {
          signInPage.className = 'custom-scroll-bar translate-in';
          //reset pages positions
          pages.forEach(page => (page.className = 'custom-scroll-bar'));
          signOutButton.textContent = 'Sign Out';
        }, 500);
      }, 1300);
    }, 1700);
  };

  //displays page number on page load
  pageNumber.textContent = '1 / ' + numOfPages;

  let currentPage: HTMLDivElement;
  let nextOrPrevPage: HTMLDivElement;
  let currentPageUpButton: HTMLSpanElement;
  let nextOrPrevPageUpButton: HTMLSpanElement;

  //next button click event handler
  nextButton.onclick = () => {
    //prevent user from clicking simultaneously quickly to avoid UI deformity
    nextButton.disabled = true;

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

    currentPage = pages[i] as HTMLDivElement;
    nextOrPrevPage = pages[j] as HTMLDivElement;

    //cycles through pages: page slide
    currentPage.className = 'custom-scroll-bar translate-out-left';
    nextOrPrevPage.className = 'custom-scroll-bar translate-in';

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
    pageTitleBar.dataset.state = 'visible';

    //This code-block is mainly for the fixed top div and partly for the page-up buttons
    if (j == 0) {
      goUpButtons[j].className = 'scale-down';
      pageTitleBar.dataset.state = 'hidden';
    } else if (j == 1 && i == 0) {
      pageTitles[numOfPages - 2].dataset.state = 'hidden';
      pageTitles[j - 1].dataset.state = 'visible';
    } else if (j - i == 1) {
      pageTitles[i - 1].dataset.state = 'hidden';
      pageTitles[j - 1].dataset.state = 'visible';
    }

    setTimeout(() => {
      displayPageUpButton();
      nextButton.disabled = false;
    }, 300);
  };

  //previous button click event handler
  previousButton.onclick = () => {
    //prevent user from clicking simultaneously quickly to avoid UI deformity
    previousButton.disabled = true;

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

    currentPage = pages[i] as HTMLDivElement;
    nextOrPrevPage = pages[j] as HTMLDivElement;
    //cycles through pages: page slide
    currentPage.className = 'custom-scroll-bar translate-out-right';
    nextOrPrevPage.className = 'custom-scroll-bar translate-in';

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
    if (j == 0) {
      goUpButtons[j].className = 'scale-down';
      pageTitleBar.dataset.state = 'hidden';
    } else if (j == numOfPages - 1 && i == 0) {
      pageTitles[i].dataset.state = 'hidden';
      pageTitles[j].dataset.state = 'visible';
    } else if (j - i != 1 && j != numOfPages - 1) {
      pageTitles[i - 1].dataset.state = 'hidden';
      pageTitles[j - 1].dataset.state = 'visible';
    }

    setTimeout(() => {
      displayPageUpButton();
      previousButton.disabled = false;
    }, 300);
  };

  //setting variables for swipe event
  let startSwipe = 0;
  let swipeCoord = 0;

  const leftElastic = Q('#left-elastic') as HTMLDivElement;
  const rightElastic = Q('#right-elastic') as HTMLDivElement;

  //attaching events to respective pages for swipe event
  pages.forEach(page => {
    page.addEventListener('touchstart', touch);
    page.addEventListener('touchend', swipe);
    page.addEventListener('scroll', displayPageUpButton);
  });

  //remove swipe listeners for elements that have horizontal scrollable content
  QAll('.prevent-swipe').forEach(el => {
    el.addEventListener('scroll', removeSwipeListeners);
    el.addEventListener('touchend', addSwipeListeners);
  });
  QAll('.custom-scroll-bar').forEach(el => {
    el.addEventListener('scroll', removeSwipeListeners);
    el.addEventListener('touchend', addSwipeListeners);
  });

  function addSwipeListeners() {
    if (nextOrPrevPage)
      setTimeout(() => {
        nextOrPrevPage.addEventListener('touchstart', touch);
        nextOrPrevPage.addEventListener('touchend', swipe);
      }, 300);
    hideElastic();
  }

  function removeSwipeListeners() {
    if (nextOrPrevPage) {
      nextOrPrevPage.removeEventListener('touchstart', touch);
      nextOrPrevPage.removeEventListener('touchend', swipe);
    }
    hideElastic();
  }

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
    hideElastic();

    if (event.touches.length > 1) return;

    //checks to prevent from sliding to next page on page-scroll-Y
    if (swipeCoord < -50 && j != numOfPages - 1) nextButton.click();
    if (swipeCoord > 50 && j != 0) previousButton.click();
  }

  function hideElastic() {
    leftElastic.style.width = '0';
    rightElastic.style.width = '0';
  }

  //onscroll event handler
  function displayPageUpButton() {
    if (j == 0) return;

    let scrollPosition = pages[j].scrollTop;

    currentPageUpButton = goUpButtons[j - 1] as HTMLSpanElement;
    nextOrPrevPageUpButton = goUpButtons[
      i == 0 ? 0 : i - 1
    ] as HTMLSpanElement;

    //ensures page-up buttons don't pop-up unexpectedly before re-appearing
    if (
      scrollPosition <= 1000 &&
      currentPageUpButton.className == 'scale-down'
    ) {
      nextOrPrevPageUpButton.className = 'scale-down';
      return;
    }

    //displays page-up buttons on scroll
    if (scrollPosition > 1000) {
      if (i == 0 && j == 1) {
        goUpButtons[numOfPageUpButtons - 1].className = 'scale-down';
        currentPageUpButton.className = 'scale-up';
      } else if (j - i < 1) {
        nextOrPrevPageUpButton.className = 'scale-down';
        currentPageUpButton.className = 'scale-up';
      } else if (j - i == 1) {
        nextOrPrevPageUpButton.className = 'scale-down';
        currentPageUpButton.className = 'scale-up';
      } else if (j == numOfPageUpButtons - 1 && i != 0) {
        currentPageUpButton.className = 'scale-down';
        nextOrPrevPageUpButton.className = 'scale-up';
      }
    } else {
      currentPageUpButton.className = 'scale-down';
    }
  }

  //class size ref onclick event handler
  const classSizeRef = () => {
    if (j == 3) {
      furtherDiscussion.className = 'custom-scroll-bar translate-out-right';
      pageTitles[2].dataset.state = 'hidden';
      goUpButtons[2].className = 'scale-down';
      j = 2;
      i = 1;
      previousButton.click();
    }
  };

  Q('#semi-interquartile-range-ref')!.onclick = classSizeRef;
  Q('#the-percentiles-ref')!.onclick = classSizeRef;
  Q('#quartiles-median-ref')!.onclick = classSizeRef;
  Q('#link-to-median')!.onclick = classSizeRef;

  //'take-example-ref' onclick event handler on page 2
  Q('#take-example')!.onclick = (e: any) => {
    e.preventDefault(); //prevent default to prevent UI deformity
    nextButton.click();
  };
}
