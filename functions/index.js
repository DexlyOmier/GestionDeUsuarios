const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    if ( context.auth.token.admin !== true ) {
        return { error: 'Solo los usuarios con privilegios de escritura pueden añadir a otros con esos privilegios' }
      }
  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    })
  }).then(() => {
    return {
      message: `Exito! ${data.email} Se ha promovido a usuario de escritura.`
    }
  }).catch(err => {
    return err;
  });
});
