#!/usr/bin/env bash
echo 'Start Firebase build'
cd ${0%/*}/..

mkdir -p firebase/functions || exit 0
mkdir -p firebase/public || exit 0

cp deploy/firebase/.firebaserc firebase
cp deploy/firebase/firebase.json firebase

cp deploy/firebase/index.js firebase/functions/
cp deploy/firebase/package.json firebase/functions/
cp client_secret.json firebase/functions
cp credentials.json firebase/functions
cp .eslintrc.json firebase/functions

cp -R app/* firebase/functions

rm firebase/functions/app.js
cp -r firebase/functions/public firebase/
rm -r firebase/functions/public

echo 'Firebase build completed!'
