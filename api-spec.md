# ppass API Spec
## Endpoints:
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
