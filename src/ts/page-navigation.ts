//This code block handles the display, slide effects etc. of the whole app and...

//Sign-out script event handler
export function loadPageNavScript() {
  //variables used for navigation
  let i = 0;
  let j = 0;

  //add onclick event handlers for page goUpButtons
  goUpButtons.forEach((button, i) =>
    button.addEventListener('click', () => {
      const index = i + 1;

      let spy = customInterval(() => {
        let id = spy.id;

        pages[index].scrollTop -= 150;

        if (pages[index].scrollTop <= 0) _cancelAnimationFrame(+id);
        pages[index].onclick = () => _cancelAnimationFrame(+id);
      }, 0);
    })
  );

  //handle keyboard event on when user presses (left|right) arrow keys
  document.body.addEventListener('keyup', handleKeyboardNavEvent);

  //remove/add left|right arrow keys event listeners when input has focus to prevent unexpected behaviour
  QAll('input').forEach(input => {
    input.addEventListener('focus', () => {
      document.body.removeEventListener('keyup', handleKeyboardNavEvent);
    });
    input.addEventListener('blur', () => {
      document.body.addEventListener('keyup', handleKeyboardNavEvent);
    });
  });

  function handleKeyboardNavEvent(e: any) {
    let key = e.keyCode || e.which;

    if (key == 39 && j != numOfPages - 1) gotoNextPage();
    else if (key == 37 && j !== 0) gotoPreviousPage();
  }

  signOutButton.onclick = () => {
    signOutButton.textContent = 'Signing out...';
    installButton.dataset.state = 'invisible';
    rememberMeCheckbox.checked = false;
    rememberMe = false;
    goUpButtons[2].disabled = true;

    if (navigator.cookieEnabled) {
      if (localStorage.userId) username = localStorage.userId;

      localStorage.rememberMe = false;
    }

    i = 0;
    j = 0;
    //Page slide
    delay(1500).then(() => {
      Q('#buttons-wrapper')!.className = 'slide-down-controls';
      pageTitleBar.dataset.state = 'hidden';
      previousButton.className = 'scale-down';
      nextButton.className = 'scale-down';
      previousButton.disabled = true;
      goUpButtons[2].disabled = true;

      delay(1000).then(() => {
        furtherDiscussion.className =
          'custom-scroll-bar prevent-swipe translate-out-left';
        signInPage.dataset.state = 'visible';

        delay(500).then(() => {
          furtherDiscussion.dataset.state = 'hidden';
          signInPage.className = 'custom-scroll-bar prevent-swipe translate-in';
          //reset pages positions
          pages.forEach(
            page => (page.className = 'custom-scroll-bar prevent-swipe')
          );
          signOutButton.textContent = 'Sign Out';
        });
      });
    });
  };

  //displays page number on page load
  pageNumber.textContent = '1 / ' + numOfPages;

  let currentPage: HTMLDivElement;
  let nextOrPrevPage: HTMLDivElement;
  let currentGoUpButton: HTMLButtonElement;
  let nextOrPrevGoUpButton: HTMLButtonElement;

  //next button click event handler
  nextButton.onclick = gotoNextPage;

  function gotoNextPage() {
    //conditionals for page slide handling
    if (i == 0 && j == 0) {
      i = 0;
      j++;
    } else if (i - j == 1) {
      i = j;
      j++;
    } else {
      if (j < numOfPages - 1) {
        i++;
        j++;
      }
    }

    currentPage = pages[i] as HTMLDivElement;
    nextOrPrevPage = pages[j] as HTMLDivElement;
    nextOrPrevPage.dataset.state = 'visible';

    //delay for 5ms for page slide animation to work
    delay(5).then(() => {
      currentPage.className =
        'custom-scroll-bar prevent-swipe translate-out-left';
      nextOrPrevPage.className = 'custom-scroll-bar prevent-swipe translate-in';
      pageTitleBar.dataset.state = 'visible';
      displayNavigationButtons();
    });
  }

  //previous button click event handler
  previousButton.onclick = gotoPreviousPage;

  function gotoPreviousPage() {
    //conditionals for page slide handling
    if (i - j == -1) {
      i = j;
      j--;
    } else {
      if (j > 0) {
        j--;
        i--;
      }
    }

    currentPage = pages[i] as HTMLDivElement;
    nextOrPrevPage = pages[j] as HTMLDivElement;
    nextOrPrevPage.dataset.state = 'visible';

    //delay for 5ms for page slide animation to work
    delay(5).then(() => {
      currentPage.className =
        'custom-scroll-bar prevent-swipe translate-out-right';
      nextOrPrevPage.className = 'custom-scroll-bar prevent-swipe translate-in';
      displayNavigationButtons();
    });
  }

  //setting variables for swipe event
  let startCoord = 0;
  let swipeCoord = 0;
  let endCoord = 0;

  const leftElastic = Q('#left-elastic') as HTMLDivElement;
  const rightElastic = Q('#right-elastic') as HTMLDivElement;

  //attaching events to respective pages for swipe event
  pages.forEach(page => {
    page.addEventListener('touchstart', touchStart);
    page.addEventListener('touchend', swipe);
    page.addEventListener('scroll', displayGoUpButton);
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

  function displayNavigationButtons() {
    if (j == 2 && !intervalInput.value) {
      let { interval, frequencies } = localStorage;

      if (interval && !intervalInput.value) intervalInput.value = interval;
      if (frequencies && !frequenciesInput.value)
        frequenciesInput.value = frequencies;
    }

    //displays current page number
    pageNumber.textContent = `${j + 1} / ${numOfPages}`;

    //hide/show next or previous buttons
    if (j == numOfPages - 1) {
      nextButton.disabled = true;
      previousButton.disabled = false;
    } else if (j == 0) {
      nextButton.disabled = false;
      previousButton.disabled = true;
    } else {
      nextButton.disabled = false;
      previousButton.disabled = false;
    }

    //This code-block is mainly for the page titles and partly for the go-up buttons
    if (j == 0) {
      goUpButtons[j].disabled = true;
      pageTitleBar.dataset.state = 'hidden';
    } else if (j == 1 && i == 0) {
      pageTitles[numOfPages - 2].dataset.state = 'hidden';
      pageTitles[j - 1].dataset.state = 'visible';
    } else {
      pageTitles[i - 1].dataset.state = 'hidden';
      pageTitles[j - 1].dataset.state = 'visible';
    }

    displayGoUpButton();
  }

  //onscroll event handler
  function displayGoUpButton() {
    if (j == 0) return;

    let scrollPosition = pages[j].scrollTop;

    currentGoUpButton = goUpButtons[j - 1] as HTMLButtonElement;
    nextOrPrevGoUpButton = goUpButtons[i == 0 ? 0 : i - 1] as HTMLButtonElement;

    //set hidden/visible states for control/navigation button
    if (scrollPosition > 1000) {
      currentGoUpButton.disabled = false;
    }

    //ensures go-up buttons don't pop-up unexpectedly before re-appearing
    if (scrollPosition <= 1000 && currentGoUpButton.disabled) {
      nextOrPrevGoUpButton.disabled = true;
      return;
    }

    //displays go-up buttons on scroll
    if (scrollPosition > 1000) {
      if (i == 0 && j == 1) {
        goUpButtons[numOfGoUpButtons - 1].disabled = true;
        currentGoUpButton.disabled = false;
      } else if (j - i < 1) {
        nextOrPrevGoUpButton.disabled = true;
        currentGoUpButton.disabled = false;
      } else if (j - i == 1) {
        nextOrPrevGoUpButton.disabled = true;
        currentGoUpButton.disabled = false;
      } else if (j == numOfGoUpButtons - 1 && i != 0) {
        currentGoUpButton.disabled = true;
        nextOrPrevGoUpButton.disabled = false;
      }
    } else {
      currentGoUpButton.disabled = true;
    }
  }

  function addSwipeListeners() {
    nextOrPrevPage.addEventListener('touchstart', touchStart);
    delay(200).then(() => nextOrPrevPage.addEventListener('touchend', swipe));

    hideElastic();
  }

  function removeSwipeListeners() {
    nextOrPrevPage.removeEventListener('touchstart', touchStart);
    delay(200).then(() =>
      nextOrPrevPage.removeEventListener('touchend', swipe)
    );

    hideElastic();
  }

  //touchstart event handler
  function touchStart(event: any) {
    startCoord = event.changedTouches[0].clientX;
  }

  //touchend event handler
  function swipe(event: any) {
    endCoord = event.changedTouches[0].clientX;
    swipeCoord = endCoord - startCoord;

    if (event.touches.length > 1) return;

    if (Math.abs(swipeCoord) > 25)
      if (j == 0 && swipeCoord > 0) {
        leftElastic.style.width = '10rem';
      } else if (j == numOfPages - 1 && swipeCoord <= 0) {
        rightElastic.style.width = '10rem';
      }
    hideElastic();

    //checks to prevent from sliding to next page on page-scroll-Y
    if (swipeCoord < -30 && j != numOfPages - 1) gotoNextPage();
    else if (swipeCoord > 30 && j != 0) gotoPreviousPage();
  }

  //elastic for when user is on first or last page and tries to swipe right or left
  function hideElastic() {
    delay(600).then(() => {
      leftElastic.style.width = '0';
      rightElastic.style.width = '0';
    });
  }

  //class size ref onclick event handler
  const classSizeRef = () => {
    if (j == 3) {
      furtherDiscussion.className =
        'custom-scroll-bar prevent-swipe translate-out-right';
      pageTitles[2].dataset.state = 'hidden';
      goUpButtons[2].disabled = true;
      j = 2;
      i = 1;
      gotoPreviousPage();
    }
  };

  Q('#semi-interquartile-range-ref')!.onclick = classSizeRef;
  Q('#the-percentiles-ref')!.onclick = classSizeRef;
  Q('#quartiles-median-ref')!.onclick = classSizeRef;
  Q('#link-to-median')!.onclick = classSizeRef;

  //'take-example-ref' onclick event handler on page 2
  Q('#take-example')!.onclick = (e: any) => {
    e.preventDefault(); //prevent default to prevent UI deformity
    gotoNextPage();
  };

  //save current state of user app navigation on change of window or tab for purpose of a reload/relaunch
  window.addEventListener('visibilitychange', function(this: any) {
    if (document.visibilityState == 'hidden') {
      if (cookieEnabled) {
        let index = 0;
        let activePage = Array.prototype.find.call(pages, (page, i: number) => {
          if (page.dataset.state == 'visible') {
            index = i;
            return true;
          }
          return false;
        });
        localStorage.activePageId = activePage.id;
        localStorage.activePageIndex = index;
        localStorage.activePageScrollTop = activePage.scrollTop;
      }
    }
  });
}
