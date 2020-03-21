//DOM selectors
const Q = document.querySelector.bind(document);
const QAll = document.querySelectorAll.bind(document);

let signInPage: HTMLDivElement;
let signInButton: HTMLButtonElement;
let usernameInput: HTMLInputElement;
let signInStatus: HTMLSpanElement;
let nextButton: HTMLButtonElement;
let previousButton: HTMLButtonElement;
let welcomePage: HTMLDivElement;
let signOutButton: HTMLButtonElement;
let pageNumber: HTMLSpanElement;
let intervalInput: HTMLInputElement;
let frequenciesInput: HTMLInputElement;
let furtherDiscussion: HTMLDivElement;
let username: string;

//preload (minified) main CSS. Using this approach as Firefox doesn't support rel='preload' for the link element
// import('./main.min.css.js').then(module => {
//   const minCSS = `<style id='min-main-css'>${module.minifiedMainCSS}</style>`;
//   document.head.querySelector('#general-style')!.insertAdjacentHTML('beforebegin', minCSS);
// }).catch(e => console.error(e + 'Failed to load main CSS!'));

this.addEventListener('load', () => {
  signInPage = Q('#sign-in-page') as HTMLDivElement;
  signInButton = Q('#sign-in') as HTMLButtonElement;
  usernameInput = Q('#username') as HTMLInputElement;
  signInStatus = Q('#sign-in-status') as HTMLSpanElement;
  nextButton = Q('#next') as HTMLButtonElement;
  previousButton = Q('#previous') as HTMLButtonElement;
  welcomePage = Q('#welcome-page') as HTMLDivElement;
  signOutButton = Q('#sign-out') as HTMLButtonElement;
  pageNumber = Q('#page-num') as HTMLSpanElement;
  intervalInput = Q('#interval') as HTMLInputElement;
  frequenciesInput = Q('#frequencies') as HTMLInputElement;
  furtherDiscussion = Q('#further-discussion-page') as HTMLDivElement;

  QAll('[data-state="hidden"]').forEach(target => {
    target.addEventListener('transitionend', () => {
      let classNames = /translate-in|welcome-page-fade-in|scale-up|slide-down|slide-up-controls|title-bar|page-title/;

      if (!classNames.test(target.className))
        setTimeout(() => {
          target.dataset.state = 'hidden';
        }, 200);
    });
  });

  const usernameElements = QAll('.username');

  if (
    !/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i.test(
      window.navigator.userAgent
    )
  )
    document.body.classList.add('desktop');
  else document.body.classList.remove('desktop');

  let userExists = false;
  let inputIsValid = true;

  if (navigator.cookieEnabled) if (localStorage.userId) userExists = true;

  if (!userExists)
    alert(
      `Hi, there! Good day. \n\nThis offline web-app was made to serve as a refresher for our upcoming STAT131 test. And it also may serve as a study guide for our mates that just joined us, because they are the ones I target and were the ones I had in mind before embarking on creating this so they be not oblivious of the topics herein but have a comprehension of them and fare well for short is the time. \n\nOk. Also, If you don't fully/really understand this topic, I urge you to follow, carefully, through the explanations and elaborations and try to understand the concepts for thy profiting. ;) \n\nPS: The contents of this app is subject to mistakes, errors and flaws and that's why I now advice that you authenticate whatever you read herein with a good Stats. Text or the recommended one. \n\nAlright. Godspeed. ;) \n\nDon't forget to forward this web-app to any of your friends who offers or offer STAT131 and just resumed. You could be lending a helping hand. :)`
    );

  //Sign user in when user presses the 'enter' key
  usernameInput.onkeyup = (e: any) => {
    inputIsValid = !/\W|\d/.test(usernameInput.value.trim());

    if (!inputIsValid) usernameInput.classList.add('bad-input');
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

    signInStatus.className = 'bad-input-feedback';
    username = `${usernameInput.value
      .trim()
      .slice(0, 1)
      .toUpperCase()}${usernameInput.value
      .trim()
      .slice(1)
      .toLowerCase()}`;

    //Condition if user hasn't inputted a value as username
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

    //this code-block works with the preceeding line(s) of code to ensure user inputs letter names
    if (username) {
      if (!inputIsValid) {
        errMsg =
          'Invalid input. Input a name━your name.\n\nNo numbers or symbols allowed.';
        signInStatus.innerHTML = errMsg.replace('\n\n', '<br />');
        return;
      }

      signInStatus.className = '';
      signInStatus.textContent = `Sign in success! Welcome, ${username}!`;

      if (localStorage) localStorage.userId = username;

      //page slide
      setTimeout(() => {
        welcomePage.dataset.state = 'visible';
        signInPage.className = 'custom-scroll-bar translate-out-left';
        signInStatus.textContent = '';
        setTimeout(() => {
          welcomePage.className = 'welcome-page-fade-in custom-scroll-bar';
          Q('#buttons-wrapper')!.dataset.state = 'visible';
          setTimeout(() => {
            Q('#buttons-wrapper')!.className = 'slide-up-controls';
            nextButton.dataset.state = 'visible';
            setTimeout(() => {
              nextButton.className = 'scale-up';
              //translate/reposition signInPage to right position in case of sign out in order to slide in from right
              signInPage.className = 'custom-scroll-bar translate-out-right';
              signInPage.dataset.state = 'hidden';
            }, 800);
          }, 800);
        }, 400);
      }, 1500);

      //sets username to kin'a personalize UX
      usernameElements.forEach(element => (element.textContent = username));

      loadPageNavScript().then(() => loadStatComputerScript());
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
});
