const fs = require('fs');
const readline = require('readline');
var {google}  = require('googleapis');
const {OAuth2Client}  = require('google-auth-library');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'credentials.json';
var consultsspreadsheet = require('../models/consultspreadsheet');


function getConsults(callback) {
  // any async callback invokes callback with response
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);

    // Authorize a client with credentials, then call the Google Sheets API.
     authorize(JSON.parse(content), callback)
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    listConsults(oAuth2Client,callback);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      listConsults(oAuth2Client,callback);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1u8EM1vf2jVdim2a-mXJI6VG_vM07ZtH2yS0lHt5stjI/edit
 * @param {OAuth2Client} auth The authenticated Google OAuth client.
 */
function listConsults(auth,callbackdata) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1OOVq0PVAicwwCKCuVo_flnu1LEaVX8VF0bwjE8K8Zw8',//'1u8EM1vf2jVdim2a-mXJI6VG_vM07ZtH2yS0lHt5stjI',
    range: 'Konsulter!A2:G',
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = data.values;
    
    /*create an object and return  */
    if (rows.length) {
      var consults= [];
      rows.forEach(function(item) {
                                           
        if (item[6]==='FALSE'||item[6]==='TRUE'){
                                              //name, customer, start, end, extent, expertiees, change
            if (item[3]==='' && item[4]===''){

              consults.push(new consultsspreadsheet(item[0],item[1], item[5],item[4],null,item[2],item[6]));
            }
            else
            {
              if (item[4]!=="" && item[4]!=='Löpande')
              {
                consults.push(new consultsspreadsheet(item[0],item[1],item[3],item[4],null,item[2],item[6]));
              }
            }
          
        }
       
        //console.log(cons.name);
        
      });
      
      var consultsSorted = consultsspreadsheet.Sort(consults);

      callbackdata(consultsSorted);
    } else {
      console.log('No data found.');
    }
  });


}

module.exports = getConsults;