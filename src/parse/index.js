import Parse from 'parse'

Parse.initialize(process.env.VUE_APP_APP_ID, process.env.VUE_APP_APP_KEY);
Parse.serverURL = `${process.env.VUE_APP_BASE_URL}/api/1`

export default Parse
