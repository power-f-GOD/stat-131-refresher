//This code block handles the display, slide effects etc. of the whole app and...

//Sign-out script event handler
export function loadPageNavScript() {
  //variables used for navigation
  let i = 0;
  let j = 0;

  const pages = QAll('[data-role="page"]');
  const numOfPages = pages.length;
  const pageTitleBar = Q('#page-title-bar') as HTMLDivElement;
  const pageTitles = QAll('.page-title');
  //ID arrays for fixed-positioned top div elements and go-up buttons respectively
  const goUpButtons = QAll('button[data-name="go-up-button"]');
  const numOfGoUpButtons = goUpButtons.length;

  //add onclick event handlers for page goUpButtons
  goUpButtons.forEach((button, i) =>
    button.addEventListener('click', () => {
      const index = i + 1;
      const start = setInterval(() => {
        pages[index].scrollTop -= 100;

        if (pages[index].scrollTop <= 0) clearInterval(start);
      }, 16);

      pages[index].onclick = () => clearInterval(start);
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
  })

  function handleKeyboardNavEvent(e: any) {
    let key = e.keyCode || e.which;

    if (key == 39 && j != numOfPages - 1) nextButton.click();
    else if (key == 37 && j !== 0) previousButton.click();
  };

  signOutButton.onclick = () => {
    signOutButton.textContent = 'Signing out...';
    rememberMeCheckbox.checked = false;
    rememberMe = false;
    goUpButtons[2].className = 'scale-down';

    if (navigator.cookieEnabled) {
      if (localStorage.userId) username = localStorage.userId;

      localStorage.rememberMe = false;
    }
    

    i = 0;
    j = 0;
    //Page slide
    setTimeout(() => {
      Q('#buttons-wrapper')!.className = 'slide-down-controls';
      pageTitleBar.dataset.state = 'hidden';
      previousButton.className = 'scale-down';
      previousButton.dataset.state = 'hidden';
      goUpButtons[2].dataset.state = 'hidden';
      setTimeout(() => {
        furtherDiscussion.className = 'custom-scroll-bar translate-out-left';
        signInPage.dataset.state = 'visible';
        setTimeout(() => {
          furtherDiscussion.dataset.state = 'hidden';
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
  let currentGoUpButton: HTMLButtonElement;
  let nextOrPrevGoUpButton: HTMLButtonElement;

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
    nextOrPrevPage.dataset.state = 'visible';

    //delay for 100ms for page slide animation to work
    setTimeout(() => {
      currentPage.className = 'custom-scroll-bar translate-out-left';
      nextOrPrevPage.className = 'custom-scroll-bar translate-in';
      pageTitleBar.dataset.state = 'visible';
    }, 100);
    displayNavigationButtons();
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
    nextOrPrevPage.dataset.state = 'visible';

    //delay for 100ms for page slide animation to work
    setTimeout(() => {
      currentPage.className = 'custom-scroll-bar translate-out-right';
      nextOrPrevPage.className = 'custom-scroll-bar translate-in';
      displayNavigationButtons();
    }, 100);
  };

  function displayNavigationButtons() {
    if (j == 2) {
      let { interval, frequencies } = localStorage;

      if (interval && !intervalInput.value) intervalInput.value = interval;
      if (frequencies && !frequenciesInput.value)
        frequenciesInput.value = frequencies;
    }

    //displays current page number
    pageNumber.textContent = `${j + 1} / ${numOfPages}`;

    //set hidden/visible states for control/navigation buttons
    if (j == numOfPages - 1) {
      previousButton.dataset.state = 'visible';
    } else if (j == 0) {
      nextButton.dataset.state = 'visible';
    } else {
      previousButton.dataset.state = 'visible';
      nextButton.dataset.state = 'visible';
    }

    //using setTimeouts for the sake of making animations work as expected
    setTimeout(() => {
      //hide/show next or previous buttons
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

      //This code-block is mainly for the page titles and partly for the go-up buttons
      if (j == 0) {
        goUpButtons[j].className = 'scale-down';
        pageTitleBar.dataset.state = 'hidden';
      } else if (j == 1 && i == 0) {
        pageTitles[numOfPages - 2].dataset.state = 'hidden';
        pageTitles[j - 1].dataset.state = 'visible';
      } else {
        pageTitles[i - 1].dataset.state = 'hidden';
        pageTitles[j - 1].dataset.state = 'visible';
      }

      setTimeout(() => {
        displayGoUpButton();
        previousButton.disabled = false;
        nextButton.disabled = false;
      }, 200);
    }, 100);
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

  function addSwipeListeners() {
    if (nextOrPrevPage)
      setTimeout(() => {
        nextOrPrevPage.addEventListener('touchstart', touchStart);
        nextOrPrevPage.addEventListener('touchend', swipe);
      }, 300);
    hideElastic();
  }

  function removeSwipeListeners() {
    if (nextOrPrevPage) {
      nextOrPrevPage.removeEventListener('touchstart', touchStart);
      nextOrPrevPage.removeEventListener('touchend', swipe);
    }
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

    if (Math.abs(swipeCoord) > 25)
      if (j == 0 && swipeCoord > 0) {
        leftElastic.style.width = '10rem';
      } else if (j == numOfPages - 1 && swipeCoord <= 0) {
        rightElastic.style.width = '10rem';
      }
    hideElastic();

    if (event.touches.length > 1) return;

    //checks to prevent from sliding to next page on page-scroll-Y
    if (swipeCoord < -50 && j != numOfPages - 1) nextButton.click();
    else if (swipeCoord > 50 && j != 0) previousButton.click();
  }

  function hideElastic() {
    setTimeout(() => {
      leftElastic.style.width = '0';
      rightElastic.style.width = '0';
    }, 600);
  }

  //onscroll event handler
  function displayGoUpButton() {
    if (j == 0) return;

    let scrollPosition = pages[j].scrollTop;

    currentGoUpButton = goUpButtons[j == 0 ? j : j - 1] as HTMLButtonElement;
    nextOrPrevGoUpButton = goUpButtons[i == 0 ? 0 : i - 1] as HTMLButtonElement;

    //set hidden/visible states for control/navigation button
    if (scrollPosition > 1000) {
      currentGoUpButton.dataset.state = 'visible';
    }

    //using setTimeouts for the sake of making animations work as expected
    setTimeout(() => {
      //ensures go-up buttons don't pop-up unexpectedly before re-appearing
      if (
        scrollPosition <= 1000 &&
        currentGoUpButton.className == 'scale-down'
      ) {
        nextOrPrevGoUpButton.className = 'scale-down';
        return;
      }

      //displays go-up buttons on scroll
      if (scrollPosition > 1000) {
        if (i == 0 && j == 1) {
          goUpButtons[numOfGoUpButtons - 1].className = 'scale-down';
          currentGoUpButton.className = 'scale-up';
        } else if (j - i < 1) {
          nextOrPrevGoUpButton.className = 'scale-down';
          currentGoUpButton.className = 'scale-up';
        } else if (j - i == 1) {
          nextOrPrevGoUpButton.className = 'scale-down';
          currentGoUpButton.className = 'scale-up';
        } else if (j == numOfGoUpButtons - 1 && i != 0) {
          currentGoUpButton.className = 'scale-down';
          nextOrPrevGoUpButton.className = 'scale-up';
        }
      } else {
        currentGoUpButton.className = 'scale-down';
      }
    }, 100);
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
