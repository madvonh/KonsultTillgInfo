# KonsultTillgInfo
Presentera konsulters tillgänglighet

Start the application: ```npm start```

## Firebase
Build a Firebase copy of the code: ```deploy/build.sh```<br>
The code will be copied to a new directory called "firebase" and will have the required Firebase code structure.<br>   

### Local
Test the application by running the command:<br>
```cd firebase```<br>
```firebase serve --only functions,hosting```<br>

If the application won't start try:<br>
```cd firebase/functions```<br>
```npm install``` or ```npm rebuild```

### Deploy
Deploy the application to Firebase:<br>
```cd firebase```<br>
```firebase deploy```
