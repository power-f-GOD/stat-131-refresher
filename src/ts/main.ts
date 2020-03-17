//DOM selectors
const Q = document.querySelector.bind(document);
const QAll = document.querySelectorAll.bind(document);

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

this.addEventListener('load', () => {
  if (
    !/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i.test(
      window.navigator.userAgent
    )
  )
    document.body.classList.add('desktop');
  else document.body.classList.remove('desktop');

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

      
      
      loadPageNavScript().then(() => {
        loadStatComputerScript();
      });

      //page slide
      setTimeout(() => {
        welcomePage.style.overflowY = 'hidden';
        signInPage.style.overflowY = 'hidden';
        signInPage.className = 'translate';
        signInStatus.textContent = '';
        username.value = '';
        setTimeout(() => {
          signInPage.style.display = 'none';
          welcomePage.style.display = 'flex';
          welcomePage.style.overflowY = 'auto';
          welcomePage.className = 'welcomePageFadeIn custom-scroll-bar';
          setTimeout(() => {
            Q('#buttons-wrapper')!.className = 'slideUpControls';
            setTimeout(() => {
              nextButton.className = 'scaleUp';
            }, 1200);
          }, 300);
        }, 400);
      }, 1200);

      //sets username to kin'a personalize UX
      for (let i = 0; i < QAll('.username').length; i++)
        QAll('.username')[i].textContent =
          _username.slice(0, 1).toUpperCase() +
          _username.slice(1).toLowerCase();
    }
  };

  let start = 2000;
  let id = requestAnimationFrame(step);
  
  function step(timestamp: any) {
    if (!start) start = timestamp;
    let progress = timestamp - start;
// console.log('progress', progress)
    if (progress < 2100 && progress > 2000) {
      console.log('something just happened!', progress)
      requestAnimationFrame(step);
    }
    
    if (progress > 2500) {
      console.log('something just cancelled!', progress)
      cancelAnimationFrame(id);
    }
  }

  if (localStorage.userId) username.value = localStorage.userId;

  function loadPageNavScript() {
    return import('./page-navigation.js').then(module => module.loadPageNavScript());
  }

  //Break Break Break Break Break Break Break Break Break Break Break Break Break
  //Break Break Break Break Break Break Break Break Break Break Break Break

  function loadStatComputerScript() {
    return import('./stat-computer.js').then(module => module.statComputerScript());
  }
});
