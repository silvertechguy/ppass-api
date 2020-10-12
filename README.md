# ppass API
> Secure way for you to check if your password has ever been hacked in a data breach.
> ppass Password checker built with the Node, Express, TypeScript and React.

![screenshot](https://github.com/silvertechguy/ppass-api/blob/master/ppass-screenshot.png)
- Check out the deployed site [API - Backend](https://ppass-api.herokuapp.com/)
- If you are looking for the frontend repo, [click here](https://github.com/silvertechguy/ppass)
- Check out the deployed site [Frontend](https://ppass-official.herokuapp.com/)
- API Endpoints: [here](https://github.com/silvertechguy/ppass-api/blob/master/api-spec.md)


## Hints about the Project
Passwords get leaked all the time. We've heared about data breaches. Facebook has been hacked with data breaches.
You do not want to send your password over the internet because it's being transfered to a server somewhere in the world. It's travelling through the interner wires and somebody could intercept it.
haveibeenpwned.com gives us a password API to check our password if it's ever been hacked.
*I do not want to send my password to this API. The best security is to trust no one.*
**Here is what I did.**
**I sent a sha1 hashed version of my password. I only give him the first 5 characters of my hashed password.**
The API is going to look in its database of all these passwords and pick all the hashed passwords that have the first 5 characters that match our password. With the reponse data I can now check my full hash to see if the password has ever been hacked.
The API is never going to know our full hashed password and therefore never ever be able to guess our password.


## Usage
### Redis
You should have Redis installed.
### Install Dependencies & Run
```
yarn
yarn build
yarn start
```

### Check Password
`GET api/v1/ppass`
Query Parameters:
`?password=supersecretpassword`
Returns count of hacked password.

##### JSON Objects returned by API:
```JSON
{
    counter: 65
}
```


### Frontend setup (React.JS)
1. Clone the frontend repo [here](https://github.com/silvertechguy/ppass)
2. Run `yarn`
3. Remove this line ` export const endpoint: string = "https://ppass-api.herokuapp.com/";` from `src/API.ts`
4. Add this line instead ` export default "http://localhost:4000";`
5. Run `yarn start`

👨‍💻 My projects are available at https://silvertechguy.netlify.app

📫 Reach me at my email silvertechguy@gmail.com

twitter https://twitter.com/silvertechyguy

LinkedIn https://linkedin.com/in/silvertechguy
