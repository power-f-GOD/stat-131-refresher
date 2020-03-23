//DOM selectors
const Q = document.querySelector.bind(document);
const QAll = document.querySelectorAll.bind(document);

const { cookieEnabled } = navigator;
let pages: NodeListOf<HTMLDivElement>;
let numOfPages: number;
let signInPage: HTMLDivElement;
let usernameInput: HTMLInputElement;
let signInButton: HTMLButtonElement;
let rememberMeCheckbox: HTMLInputElement;
let signInStatus: HTMLSpanElement;
let nextButton: HTMLButtonElement;
let previousButton: HTMLButtonElement;
let welcomePage: HTMLDivElement;
let signOutButton: HTMLButtonElement;
let pageNumber: HTMLSpanElement;
let pageTitleBar: HTMLDivElement;
let pageTitles: NodeListOf<HTMLHeadingElement>;
let goUpButtons: NodeListOf<HTMLButtonElement>;
let numOfGoUpButtons: number;
let intervalInput: HTMLInputElement;
let frequenciesInput: HTMLInputElement;
let furtherDiscussion: HTMLDivElement;
let username: string;
let rememberMe: boolean;

const _requestAnimationFrame = _requestAnimationFrameWrapper();
const _cancelAnimationFrame = _cancelAnimationFrameWrapper();

function _cancelAnimationFrameWrapper() {
  if (window.cancelAnimationFrame) return window.cancelAnimationFrame;
  return (id: number) => {
    clearTimeout(id);
  };
}

this.addEventListener('load', () => {
  pages = QAll('[data-role="page"]');
  numOfPages = pages.length;
  pageTitleBar = Q('#page-title-bar') as HTMLDivElement;
  pageTitles = QAll('.page-title');
  goUpButtons = QAll('button[data-name="go-up-button"]');
  numOfGoUpButtons = goUpButtons.length;
  signInPage = Q('#sign-in-page') as HTMLDivElement;
  usernameInput = Q('#username') as HTMLInputElement;
  signInButton = Q('#sign-in') as HTMLButtonElement;
  rememberMeCheckbox = Q('#remember-me') as HTMLInputElement;
  signInStatus = Q('#sign-in-status') as HTMLSpanElement;
  nextButton = Q('#next') as HTMLButtonElement;
  previousButton = Q('#previous') as HTMLButtonElement;
  welcomePage = Q('#welcome-page') as HTMLDivElement;
  signOutButton = Q('#sign-out') as HTMLButtonElement;
  pageNumber = Q('#page-num') as HTMLSpanElement;
  intervalInput = Q('#interval') as HTMLInputElement;
  frequenciesInput = Q('#frequencies') as HTMLInputElement;
  furtherDiscussion = Q('#further-discussion-page') as HTMLDivElement;

  //add transition end listeners to set state of non visible pages to 'hidden' after end of transition (animation) for the sake of accessibility and the tab index issue
  QAll('[data-state="hidden"]').forEach(target => {
    target.addEventListener('transitionend', () => {
      let classNames = /translate-in|welcome-page-fade-in|scale-up|slide-down|slide-up-controls|title-bar|page-title/;

      if (!classNames.test(target.className))
        awaits(200).then(() => {
          target.dataset.state = 'hidden';
        });
    });
  });

  //check if user is on a mobile device or PC then add custom scroll bar to scrollable elements accordingly
  let isMobile = /(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i;
  if (!isMobile.test(window.navigator.userAgent))
    document.body.classList.add('desktop');
  else document.body.classList.remove('desktop');

  const usernameElements = QAll('.username');

  let userExists = false;
  let usernameInputIsValid = true;

  //check if user previously checked the "Keep me signed in" checkbox
  if (cookieEnabled) {
    let _rememberMe = localStorage.rememberMe;

    userExists = !!localStorage.userId;
    rememberMe = _rememberMe ? JSON.parse(_rememberMe) : false;

    if (rememberMe) {
      rememberMeCheckbox.checked = true;
    }
  }

  if (!userExists)
    alert(
      `Hi, there! Good day. \n\nOk. This offline web-app was made to serve as a refresher for the upcoming STAT131 test. And it also may serve as a study guide for our colleagues who just joined us, because they were the ones I target and had in mind before embarking on creating this, so they be not oblivious of the topics herein but have a comprehension of them and fare well in the test for short is the time. \n\nAlso, if you don't fully/really understand this topic, I urge you to follow, carefully, through the explanations and elaborations and try to understand the concepts for thy profiting. ;) \n\nPS: The contents of this app may be subject to mistakes, errors and flaws and that's why I now advise that you authenticate whatever you read herein with a good Stats Text or the recommended one. \n\nAlright. Godspeed. ;) \n\nDon't forget to forward or share this web-app to any of your friends who offers or offer STAT131 and just resumed. You could be lending a helping hand. :)`
    );

  //Sign user in when user presses the 'enter' key
  usernameInput.onkeyup = (e: any) => {
    usernameInputIsValid = !/\W|\d/.test(usernameInput.value.trim());

    if (!usernameInputIsValid) usernameInput.classList.add('bad-input');
    else usernameInput.classList.remove('bad-input');

    signInStatus.textContent = '';

    if (e.keyCode == 13 || e.which == 13) {
      usernameInput.blur();
      signInButton.click();
    }
  };

  //Sign-in script event handler
  signInButton.onclick = () => {
    let errMsg;

    //store rememberMe state in localStorage
    if (cookieEnabled) {
      if (rememberMeCheckbox.checked) localStorage.rememberMe = true;
      else localStorage.rememberMe = false;
    }

    signInStatus.className = 'bad-input-feedback';
    username = `${usernameInput.value
      .trim()
      .slice(0, 1)
      .toUpperCase()}${usernameInput.value
      .trim()
      .slice(1)
      .toLowerCase()}`;

    //Condition if user hasn't inputted any value as username
    if (!username) {
      errMsg = 'No name.\n\nYou have to input your name to sign in.';
      signInStatus.innerHTML = errMsg.replace('\n\n', '<br />');
      usernameInput.value = '';
      return alert(errMsg);
    }

    if (username.length < 2) {
      errMsg = 'Your real name is not a character long. Input your name.';
      signInStatus.innerHTML = errMsg;
      return;
    }

    //the preceeding line(s) of code ensure user inputs letter names
    if (username) {
      if (!usernameInputIsValid) {
        errMsg =
          'Invalid input. Input a name━your name.\n\nNo numbers or symbols allowed.';
        signInStatus.innerHTML = errMsg.replace('\n\n', '<br />');
        return;
      }

      signInStatus.className = '';
      signInStatus.textContent = !rememberMe
        ? `Sign in success! Welcome, ${username}!`
        : '';

      if (cookieEnabled) localStorage.userId = username;

      //page slide animation
      awaits(rememberMe ? 500 : 1500).then(() => {
        welcomePage.dataset.state = 'visible';
        signInPage.className = 'custom-scroll-bar translate-out-left';
        signInStatus.textContent = '';

        awaits(400).then(() => {
          welcomePage.className = 'welcome-page-fade-in custom-scroll-bar';
          Q('#buttons-wrapper')!.dataset.state = 'visible';

          awaits(800).then(() => {
            Q('#buttons-wrapper')!.className = 'slide-up-controls';
            nextButton.dataset.state = 'visible';

            awaits(800).then(() => {
              nextButton.className = 'scale-up';
              //translate/reposition signInPage to right position in case of sign out in order to slide in from right again
              signInPage.className = 'custom-scroll-bar translate-out-right';
              signInPage.dataset.state = 'hidden';
            });
          });
        });
      });

      //sets all username in app to kin'a personalize UX
      usernameElements.forEach(element => (element.textContent = username));

      loadPageNavScript().then(() =>
        loadStatComputerScript().then(() => {
          awaits(200).then(() => {
            if (cookieEnabled) {
              if (localStorage.activePageId && rememberMe) {
                let { activePageId } = localStorage;
                let currentPage = Array.prototype.find.call(pages, page =>
                  page.dataset.state == 'visible'
                );

                for (let i = 0; i < numOfPages; i++)
                  if (activePageId != currentPage.id) {
                    awaits(300).then(() => {
                      nextButton.click();
                    });
                  }
              }
            }
          });
        })
      );
    }
  };
  Q('#my-name')!.textContent = "@Power'f-GOD⚡⚡";

  if (localStorage.userId) usernameInput.value = localStorage.userId;

  function loadPageNavScript() {
    return import('./page-navigation.js').then(module =>
      module.loadPageNavScript()
    );
  }

  function loadStatComputerScript() {
    return import('./stat-computer.js').then(module =>
      module.loadStatComputerScript()
    );
  }

  if (cookieEnabled)
    if (localStorage.rememberMe && JSON.parse(localStorage.rememberMe))
      signInButton.click();
});

//save active page info on close of window or on visibility change; will be used to restore state on app reload
this.addEventListener('visibilitychange', function(this: any) {
  if (document.visibilityState == 'hidden') {
    if (cookieEnabled) {
      let index = 0;
      let activePage = Array.prototype.find.call(
        pages,
        (page: HTMLElement, i: number) => {
          if (page.dataset.state == 'visible') {
            index = i;
            return true;
          }
          return false;
        }
      );
      localStorage.activePageId = activePage.id;
      localStorage.activePageIndex = index;
    }
  }
});

//optimized window.setTimeout replacement that returns a promise
function awaits(timeout: number) {
  return new Promise((resolve: Function) => {
    if (!Number(timeout))
      throw Error('Expects a time in milliseconds as parameter.');

    let start = 0;
    let id = _requestAnimationFrame(animate);

    function animate(timestamp: number) {
      if (!start) start = timestamp;
      let timeElapsed = timestamp - start;

      if (timeElapsed < timeout) id = _requestAnimationFrame(animate);
      else resolve(id);
    }
  });
}

//optimized window.setInterval replacement that returns the interval id
function customInterval(callback: Function, interval: number) {
  if (!callback || !Number(interval)) throw Error('Two parameters expected.');

  let start = 0;
  let spy = { id: _requestAnimationFrame(animate) };

  function animate(timestamp: number) {
    if (!start) start = timestamp;

    let timeElapsed = timestamp - start;

    spy.id = _requestAnimationFrame(animate);

    if (timeElapsed % interval < 17 && timeElapsed > interval) callback();
  }

  return spy;
}

function _requestAnimationFrameWrapper() {
  if (window.requestAnimationFrame) return window.requestAnimationFrame;
  return () => {
    let previousTime = 0;

    /**
     * Credit to Paul Irish (@ www.paulirish.com) for creating/providing this polyfill
     */
    return (callback: Function) => {
      let timestamp = new Date().getTime();
      let timeout = Math.max(0, 16 - (timestamp - previousTime));
      let id = setTimeout(() => {
        callback(timestamp + timeout);
      }, 16); //corrected this line from 'timeout' in actual polyfill to '16' as it made animation slow and jank

      previousTime = timestamp + timeout;

      return id;
    };
  };
}
