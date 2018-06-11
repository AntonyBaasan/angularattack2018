import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public token: String = '';
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void { }

  loginGoogle() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(result => {
        const token = result.credential.accessToken;
      })
      .catch(this.loginErrorHandler.bind(this));
  }
  loginGithub() {
    this.afAuth.auth
      .signInWithPopup(new auth.GithubAuthProvider())
      .then(result => {
        const token = result.credential.accessToken;
      })
      .catch(this.loginErrorHandler.bind(this));
  }
  loginFacebook() {
    this.afAuth.auth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .then(result => {
        const token = result.credential.accessToken;
      })
      .catch(this.loginErrorHandler.bind(this));
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  showToken() {
    this.afAuth.idToken.subscribe(token => {
        this.token = token;
    });
  }

  private getProvederById(provideId: string) {
    // EmailAuthProviderID: password
    // PhoneAuthProviderID: phone
    // GoogleAuthProviderID: google.com
    // FacebookAuthProviderID: facebook.com
    // TwitterAuthProviderID: twitter.com
    // GitHubAuthProviderID: github.com
    if (provideId === 'google.com') {
      return new auth.GoogleAuthProvider();
    }
    if (provideId === 'github.com') {
      return new auth.GithubAuthProvider();
    }
    if (provideId === 'facebook.com') {
      return new auth.FacebookAuthProvider();
    }
  }

  private loginErrorHandler(error) {
    // Step 2.
    // An error happened.
    if (error.code === 'auth/account-exists-with-different-credential') {
      // User's email already exists.
      // The pending Google credential.
      const pendingCred = error.credential;
      // The provider account's email address.
      const email = error.email;
      // Get sign-in methods for this email.
      const fAuth = auth();
      fAuth.fetchSignInMethodsForEmail(email).then(methods => {
        // Step 3.
        // If the user has several sign-in methods,
        // the first method in the list will be the "recommended" method to use.
        if (methods[0] === 'password') {
          // Asks the user his password.
          // In real scenario, you should handle this asynchronously.
          // const password = promptUserForPassword(); // TODO: implement promptUserForPassword.
          // fAuth.signInWithEmailAndPassword(email, password).then(function(user) {
          //   // Step 4a.
          //   return user.link(pendingCred);
          // }).then(function() {
          //   // Google account successfully linked to the existing Firebase user.
          //   goToApp();
          // });
          // return;
        }
        // All the other cases are external providers.
        // Construct provider object for that provider.
        // TODO: implement getProviderForProviderId.
        const provider = this.getProvederById(methods[0]);
        // At this point, you should let the user know that he already has an account
        // but with a different provider, and let him validate the fact he wants to
        // sign in with this provider.
        // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
        // so in real scenario you should ask the user to click on a "continue" button
        // that will trigger the signInWithPopup.
        fAuth.signInWithPopup(provider).then(function (result) {
          // Remember that the user may have signed in with an account that has a different email
          // address than the first one. This can happen as Firebase doesn't control the provider's
          // sign in flow and the user is free to login using whichever account he owns.
          // Step 4b.
          // Link to Google credential.
          // As we have access to the pending credential, we can directly call the link method.
          result.user
            .linkAndRetrieveDataWithCredential(pendingCred)
            .then(function (usercred) {
              // Google account successfully linked to the existing Firebase user.
              // goToApp();
            });
        });
      });
    }
  }
}
