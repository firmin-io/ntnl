import test from "ava";

import ntnl from "..";

test("no options provided 1", (t) => {
  var sanitizer = ntnl();
  const data = { a: null };
  var result = sanitizer(data);
  t.is(result.a, data.a);
});

test("no options provided 2", (t) => {
  var sanitizer = ntnl();
  var data = { a: null, b: "b" };
  var result = sanitizer(data);
  t.is(result.a, data.a);
  t.is(result.b, data.b);
});

test("simple sanitization", (t) => {
  var sanitizer = ntnl({
    a: "x",
  });
  var data = { a: null, b: "b" };
  var result = sanitizer(data);
  t.is(result.a, "x");
  t.is(result.b, data.b);
});

test("nested object sanitization 1", (t) => {
  var sanitizer = ntnl({
    "b.x.y": "nested",
  });
  var data = { a: null };
  var result = sanitizer(data);
  t.is(result.a, data.a);
  t.is(result.b.x.y, "nested");
});

test("nested object sanitization 2", (t) => {
  // providing options
  const clean = ntnl({
    "user.amount_owed": 0,
    "accounts.checking.balance": 0,
    "accounts.savings.balance": 0,
  });
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
  var result = clean(data);
  t.is(result.user.amount_owed, 0);
  t.is(result.accounts.savings.balance, 0);
  t.is(result.accounts.checking.balance, 0);
});
