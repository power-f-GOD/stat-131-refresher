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
let installButton: HTMLButtonElement;
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

let _requestAnimationFrame: Function;
let _cancelAnimationFrame: Function;

this.addEventListener('load', loadAppScript);

function loadAppScript() {
  _requestAnimationFrame = _requestAnimationFrameWrapper();
  _cancelAnimationFrame = _cancelAnimationFrameWrapper();

  pages = QAll('[data-role="page"]') as any;
  numOfPages = pages.length;
  pageTitleBar = Q('#page-title-bar') as HTMLDivElement;
  pageTitles = QAll('.page-title');
  goUpButtons = QAll('button[aria-label="go up"]');
  numOfGoUpButtons = goUpButtons.length;
  signInPage = Q('#sign-in-page') as HTMLDivElement;
  usernameInput = Q('#username') as HTMLInputElement;
  signInButton = Q('#sign-in') as HTMLButtonElement;
  rememberMeCheckbox = Q('#remember-me') as HTMLInputElement;
  signInStatus = Q('#sign-in-status') as HTMLSpanElement;
  installButton = Q('#install') as HTMLButtonElement;
  nextButton = Q('#next') as HTMLButtonElement;
  previousButton = Q('#previous') as HTMLButtonElement;
  welcomePage = Q('#welcome-page') as HTMLDivElement;
  signOutButton = Q('#sign-out') as HTMLButtonElement;
  pageNumber = Q('#page-num') as HTMLSpanElement;
  intervalInput = Q('#interval') as HTMLInputElement;
  frequenciesInput = Q('#frequencies') as HTMLInputElement;
  furtherDiscussion = Q('#further-discussion-page') as HTMLDivElement;

  //install app listener
  let deferredPromptForInstall: any;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPromptForInstall = e;

    window.addEventListener('appinstalled', () =>
      delay(1000).then(() => {
        alert(
          'STAT 131 Refresher successfully installed. You can now launch app anytime from homescreen whether online or offline.'
        );
      })
    );
  });

  //add transition end listeners to set state of non visible pages to 'hidden' after end of transition (animation) for the sake of accessibility and the tab index issue
  QAll('[data-state="hidden"]').forEach(target => {
    target.addEventListener('transitionend', () => {
      let classNames = /translate-in|welcome-page-fade-in|scale-up|slide-down|slide-up-controls|title-bar|page-title/;

      if (!classNames.test(target.className)) target.dataset.state = 'hidden';
    });
  });

  //check if user is on a mobile device or PC then add custom scroll bar to scrollable elements accordingly
  let isMobile = /(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i;
  if (!isMobile.test(window.navigator.userAgent))
    document.body.classList.add('desktop');
  else {
    document.body.classList.remove('desktop');
  }

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
      `Hi, there! Good day. \n\nOk. This offline web-app was made to serve as a refresher for the upcoming STAT131 test. And it also may serve as a study guide for our colleagues who just joined us, because they are the ones I target and had in mind before embarking on creating this, so they be not oblivious of the topics herein but have a comprehension of them and fare well in the test to come for short is the time. \n\nAlso, if you don't fully/really understand this topic, I urge you to follow, carefully, through the explanations and elaborations and try to understand the concepts for thy profiting. ;) \n\nPS: The contents of this app may be subject to mistakes, errors and flaws and that's why I now advise that you authenticate whatever you read herein with a good Stats Text or the recommended one. And please, send a message if in case you find or notice any errors. (Link to my Facebook on sign in page)  \n\nAlright. Godspeed. ;) \n\nDon't forget to forward or share this web-app to any of your friends who offers or offer STAT131 and just resumed. You could be lending a helping hand. :)`
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

      //prevent zoom in and out on mobile for the sake of swipe feature
      if (isMobile) Q('meta[name="viewport"]')!.content += ', user-scalable=no';

      //page slide animation
      delay(rememberMe ? 750 : 1500).then(() => {
        welcomePage.dataset.state = 'visible';
        signInPage.className = 'custom-scroll-bar translate-out-left';
        signInStatus.textContent = '';

        delay(350).then(() => {
          welcomePage.className =
            'welcome-page-fade-in custom-scroll-bar prevent-swipe';
          Q('#buttons-wrapper')!.dataset.state = 'visible';

          delay(800).then(() => {
            Q('#buttons-wrapper')!.className = 'slide-up-controls';
            nextButton.disabled = false;

            delay(800).then(() => {
              nextButton.className = 'scale-up';
              previousButton.className = 'scale-up';
              //translate/reposition signInPage to right position in case of sign out in order to slide in from right again
              signInPage.className = 'custom-scroll-bar translate-out-right';
              signInPage.dataset.state = 'hidden';

              if (deferredPromptForInstall) {
                installButton.disabled = false;
                installButton.dataset.state = 'visible';

                //add click event for install button after user has signed in
                installButton.addEventListener('click', () => {
                  deferredPromptForInstall.prompt();
                  deferredPromptForInstall.userChoice.then(
                    (choiceResult: any) => {
                      if (choiceResult.outcome == 'accepted') {
                        installButton.disabled = true;
                        installButton.dataset.state = 'invisible';
                      }
                      deferredPromptForInstall = null;
                    }
                  );
                });
              }
            });
          });
        });
      });

      //sets all username in app to kin'a personalize UX
      usernameElements.forEach(element => (element.textContent = username));

      loadPageNavScript()
        .then(() => loadStatComputerScript())
        .then(() =>
          delay(1000).then(() => {
            if (cookieEnabled) {
              let { activePageId } = localStorage;

              if (activePageId && rememberMe)
                for (let i = 0, timeout = 0; i < numOfPages; i++) {
                  let currentPage = pages[i];
                  let scrollTop = +localStorage.activePageScrollTop;

                  if (activePageId != currentPage.id) {
                    delay((timeout += 700)).then(() => nextButton.click());
                  } else {
                    delay(timeout ? timeout : 2800).then(
                      () => (Q(`#${activePageId}`)!.scrollTop = scrollTop)
                    );
                    break;
                  }
                }
            }
          })
        );
    }
  };
  Q('#my-name')!.textContent = "@Power'f-GOD⚡⚡";

  if (localStorage.userId) usernameInput.value = localStorage.userId;

  function loadPageNavScript() {
    return import('./page-navigation.min.js').then(module =>
      module.loadPageNavScript()
    );
  }

  function loadStatComputerScript() {
    return import('./stat-computer.min.js').then(module =>
      module.loadStatComputerScript()
    );
  }

  if (cookieEnabled) if (rememberMe) signInButton.click();
}

//The following are timers used throught out app

//optimized somewhat version of window.setTimeout that returns a promise
function delay(timeout: number) {
  return new Promise((resolve: Function) => {
    if (isNaN(timeout))
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

function customTimeout(callback: Function, timeout: number) {
  if (isNaN(timeout))
    throw Error('Expects a time in milliseconds as parameter.');

  let start = 0;
  let id = _requestAnimationFrame(animate);

  function animate(timestamp: number) {
    if (!start) start = timestamp;
    let timeElapsed = timestamp - start;

    if (timeElapsed < timeout) id = _requestAnimationFrame(animate);
    else callback();
  }

  return id;
}

//optimized window.setInterval replacement that returns the interval id
function customInterval(callback: Function, interval: number) {
  if (!callback || isNaN(interval)) throw Error('Two parameters expected.');

  interval = interval == 0 ? 1 : interval;

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

function _cancelAnimationFrameWrapper() {
  if (window.cancelAnimationFrame) return window.cancelAnimationFrame;
  return (id: number) => {
    clearTimeout(id);
  };
}
