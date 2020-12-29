## The TMS node server handles the translations

### Considerations:
- They way it's build, it will not support multi languages:
    - They will be accepted in the json but given that there's no mechanism to differenciate between the _sourceLanguage_ and _targetLanguage_ when fetching from the database, the resulting translations will be __wonky__
    - using json-redis and parsing the input json in a tree could be a easy way to handle the multiple languages
      - it would mean some small changes on the other server
- Testing is minimal
- It would have worked better using a message queue to handle the new translation requests, but in order to simplify the mvp I chose to just use redis to store all of the data.
- It's very optimistic in the send that the implementation ignores a lot of possible errors:
  - Inserting and getting data from redis
  - Malformed data inputs

---
### to run only in dev mode
(will still need a redis instace running)
1. create a .env file with the REDIS_URL
2. `npm start`
