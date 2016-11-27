# My personal-care assistant

Using Telegram-bot to get informations what I need everyday morning as a personal assistant. 

## Base

Base on Node.js

## Dependencies

1. [request](https://github.com/request/request)
2. [cheerio](https://github.com/cheeriojs/cheerio)
3. [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
4. [heroku-cli](https://github.com/heroku/cli) && settings
5. [moment.js](http://momentjs.com/)
6. [later.js](http://bunkat.github.io/later/index.html)

## Targets I want to achieve.

- [x] Telegram-bot
- [x] Get weather and my astro horoscope of today.
- [x] Get different city weather information on work-day and weekend.
- [x] Send Message at 08:00 everyday.
- [x] Talk like a personal assistant.
- [x] Arrange nested file collection.
- [x] Using ES6 syntax.
- [ ] Bot command to get information.
- [ ] My assistant can talk with me.
- [ ] Connect language-understanding-intelligent-service(LUIS).
- [ ] Custom personal assistant for every bot user.

## How to set up a bot and deploy to Heroku server?

Please see this [repository](https://github.com/mvpdw06/currency-bot) for details.

## Problems I meet

1. How to run app in time I set?

    Heroku server is run at United States or Europe, so ```new Date()``` in Node.js will be incorrect with Taipei timezone.

    So, We need to change timezone in Heroku app.

    ```
    $ heroku config:add TZ='ASIA/Taipei'
    ```

2. Next question is... **Can it work**?
   
   Unfortunately, this answer is **No**.

   So we need to find another solution for running schedule and support timezone setting.

3. What solution should we use?

    After investigation, we have two solution here.

    1. [node-schedule](https://github.com/node-schedule/node-schedule)
        
        Easy way to set schedule task, coding semantics and base on Node.js.

        **But** it not support **timezone setting**, so we can not choose this solution.

    2. [later.js](http://bunkat.github.io/later/index.html)
        
        Syntax chain like to set schedule, no dependencies and base on Node.js.

        It can **support timezone** setting!

        ```
        var later = require('later');
        later.date.timezone("Asia/Taipei");
        ```

        After test on Heroku server, It can totally work!

4. How can I use ES6 syntax in Node.js?

    I use command to let v8 engine to know I want to use ES6 syntax.

    

    ```
    $ node --harmony index.js 
    ```  
    
    But please keep in your mind, v8 engine is not totally support ES6 syntax with using command.

    e.g. ```import ... fomr '...'``` is not support, but arrow function ,const and let is work perfect. 
