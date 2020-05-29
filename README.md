# ntnl

> JS Library to sanitize null / undefined values in objects by replacing them with provided defaults

## Install

```bash
npm install --save ntnl
```

## Usage

Configure fields that shouldn't be null by passing an object containing fields along with a default value. See the examples below.

```js
const ntnl = require("ntnl");

const cleaner = ntnl(); // returns a method with take the object to be cleaned as a param

const cleaner2 = ntnl({ field: "default value" });
```

Use without options

```js
const ntnl = require("ntnl");

const clean = ntnl(); // no options provided

const data = { a: undefined };

const result = clean(data); // result: {a: undefined}

// when no options are provided the same object will be returned unmodified
```

Use with options

```js
const ntnl = require("ntnl");

const clean = ntnl({ a: "default non null value" });

const data1 = { a: null };

const result1 = clean(data);
// result1: {a: 'default non null value'}
// the value of a was replaced with the provided default value

const data2 = { a: "some non null value", b: null };

const result2 = clean(data3);
// result2: {a: 'some non null value', b: null}

// the value of a was not replaces since a had a non null value
// the value of b was not replaces since b was not specified in the options
```

Use with nested object [note that arrays are not currently supported]

```js
const ntnl = require('ntnl');

const clean = ntnl({'x.y': 'default'});

const data1 = {a: 'value'};

const result1 = clean(data);
// result1: {a: 'value', x: {y: 'default'}}
// x was added since it didn't exist, and the default value was applied for y

const data2 = {a: 'value', x: {y: 'other value'};

const result2 = clean(data2);
// result2: {a: 'value', x: {y: 'other value'}
// nothing changed since the field 'x.y' was not null

```

A more concrete example

```js
const ntnl = require("ntnl");

const data = {
  user: {
    username: "jb_007",
    amount_owed: null,
  },
  accounts: {
    checking: {
      balance: undefined,
      account_number: 123456,
    },
    savings: {
      balance: undefined,
      account_number: 654321,
    },
  },
};

// providing options
const clean = ntnl({
  "user.amount_owed": 0,
  "accounts.checking.balance": 0,
  "accounts.saving.balance": 0,
});

const result = clean(data);
/*
{
  user: { username: 'jb_007', amount_owed: 0 },
  accounts: {
    checking: { balance: 0, account_number: 123456 },
    savings: { balance: 0, account_number: 654321 }
  }
}
*/
```

## License

MIT © [Firmin Saint-Amour](https://github.com/firmin-io)
