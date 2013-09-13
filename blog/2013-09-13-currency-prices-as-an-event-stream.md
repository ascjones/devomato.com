---
layout: 'post'
title: 'Currency prices as an event stream'
tags: [EventStore]
---

# Currency prices as an event stream

An excellent real world example of a stream of events is the frequently changing prices of financial instruments. So I'm going to use that data to play with [EventStore](http://geteventstore.com), see what interesting things I can do with it. 

## Getting the data

Forex broker [OANDA](http://developer.oanda.com/) are building a nice [REST API](https://github.com/oanda/apidocs/) which we can use to grab some realtime price quotes. I'll use the EUR/USD currency pair for this example. A request to [http://api-sandbox.oanda.com/v1/quote?instruments=EUR_USD](http://api-sandbox.oanda.com/v1/quote?instruments=EUR_USD) gives us the following response:

```
{
  "prices" : [
    {
      "instrument" : "EUR_USD",
      "time" : "2013-09-13T09:41:06.063158Z",
      "bid" : 1.32864,
      "ask" : 1.32869
    }
  ]
}
```

To start with we'll just poll this url once a second to get the latest price, and push an event to the EventStore if the price has changed.
	
## Pushing events to the EventStore

Guided by the EventStore [docs](https://github.com/EventStore/EventStore/wiki/Writing-to-a-Stream-(HTTP\)) and Rob Ashton's [post](http://codeofrob.com/entries/pushing-data-into-streams-in-the-eventstore.html) about writing to a stream over HTTP, I'm going to post the price data to an event stream in the EventStore. I'll package the price data up into an event of type `PriceChanged`, and post it to a stream called `EUR_USD`:

```
var request = require('request');
var uuid = require('node-uuid');

var instrument = process.argv[2] || "EUR_USD"
var url = "http://api-sandbox.oanda.com/v1/quote?instruments=" + instrument;
var lastBid, lastAsk;

console.log('Polling prices for ' + instrument);

setInterval(function() {
  request({url:url, json:true}, function (error, response, body) {

    if (!error && response.statusCode == 200) {
      var price = body.prices[0];
      if (price.bid !== lastBid || price.ask !== lastAsk) {
        request.post({
          url : "http://127.0.0.1:2113/streams/" + instrument, 
          json : [{
            "eventId" : uuid.v1(), 
            "eventType" : "price-changed",
            "data" : price
          }]
        });
        lastBid = price.bid;
        lastAsk = price.ask;
      }
    }
  });
}, 1000);
```

We can now see price change events showing up on the EUR_USD stream by looking at the EventStore http UI at `/streams/EUR_USD`, or alternatively `/streams/EUR_USD?format=json` to fetch the stream of events in AtomPub format.

![EUR_USD Stream in UI](./assets/images/EventStoreUI_EURUSD_Event_Stream.png) 

And we can GET the data for an individual price change event from the stream by following the url provided in the stream feed: e.g. `/streams/EUR_USD/1?format=json` which gets us the json we originally persisted from the OANDA API:

```
{
  "instrument": "EUR_USD",
  "time": "2013-09-13T13:48:44.928072Z",
  "bid": 1.32642,
  "ask": 1.32649
}
```

I'll leave that running for a little bit to collect some price changes, after which I will start to play around with some EventStore projections and to see if I can tease anything interesting out of the data.


