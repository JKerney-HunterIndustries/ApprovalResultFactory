# approval-result-factory

<a href='https://www.npmjs.com/package/approval-result-factory'>
    <img src='https://img.shields.io/npm/v/approval-result-factory.svg?link=https://www.npmjs.com/package/approval-result-factory&?link=https://www.npmjs.com/package/approval-result-factory' alt='NPM Version' /> 
</a> <a href='https://npm-stat.com/charts.html?package=approval-result-factory'>
    <img src='https://img.shields.io/npm/dt/approval-result-factory.svg' alt='NPM Downloads'/>
</a> <a href='https://opensource.org/licenses/MIT'>
    <img src='https://img.shields.io/npm/l/approval-result-factory.svg' alt='License MIT'/>
</a> <a href='https://david-dm.org/JKerney-HunterIndustries/approval-result-factory'>
    <img src='https://david-dm.org/JKerney-HunterIndustries/approval-result-factory.svg' alt='Dependencies' />
</a>

**What?**

Approval result factory, builds an object that allows for the easier approval of complex interactions of service mocks.

This library is intended to be used with <a href='https://www.npmjs.com/package/sinon'>sinon</a> and <a href='https://www.npmjs.com/package/approvals'>approvals</a>. It also has support for <a href='https://www.npmjs.com/package/stubcontractor'>stubcontractor</a> a touch integration testing library.

**Why?**

When testing complex mock heavy interactions, there is a lot of boiler plate code used to get a nicely readable approvals result. This facory builds an object to stringify and use.

**Note**

This library works well with <a href='https://www.npmjs.com/package/spyfactory'>spyFactory</a>.

---

## addDatum

Add datum is the simplest of calls. It adds data to the result unconditionally.

```JavaScript
let resultBuilder = resultBuilderFactory();
resultBuilder.addDatum('add string', 'value string');

const result = resultBuilder.getResult();
```

At this point the result looks like:

```JSON
{
    "add string": "value string"
}
```

---

## addData

Add data is the next simplest call. It adds an array of arrays to the object.

```JavaScript
let resultBuilder = resultBuilderFactory();
resultBuilder.addData(
    [
        ['add string', 'value string'],
        ['added int', 5],
        ['added null', null],
    ]
);

const result = resultBuilder.getResult(); 
```

At this point the result looks like:

```JSON
{
    "add string": "value string",
    "added int": 5,
    "added null": null
}
```

---

## addCall

Add call looks at a sinon spy method and conditionally adds it if it has been called.

```JavaScript
let call1 = sinon.spy();
let call2 = sinon.spy();

call2('I called number 2');

let resultBuilder = resultBuilderFactory();

resultBuilder.addCall('first', call1);
resultBuilder.addCall('second', call2);

const result = resultBuilder.getResult();
```

Because only ```call2``` was exersized the result looks like:

```JSON
{
    "second": [
        [
            "I called number 2"
        ]
    ]
}
```

---

## addCalls

'addcalls' addes spies in an array of arrays.

```JavaScript
let call1 = sinon.spy();
let call2 = sinon.spy();
let call3 = sinon.spy();

call1(1);
call3('call3');

let resultBuilder = resultBuilderFactory();

resultBuilder.addCalls(
    [
        ['first', call1],
        ['second', call2],
        ['third', call3]
    ]
);

const result = resultBuilder.getResult();
```

The result now looks like:

```JSON
{
    "first": [
        [
            1
        ]
    ],
    "third": [
        [
            "call3"
        ]
    ]
}
```

---

## addFakeService

Add service fake takes an object with methods that are spies. It then conditionally addes each of those methods if they have been called.

**NOTE**

The fake service must have a property ```__name``` which will contain the name of the module being faked.

```JavaScript
const myFakeService = {
    __name: 'calculator',
    add: sinon.spy(),
    subtraction: sinon.spy(),
    multiplication: sinon.spy()
};

myFakeService.add(1, 2);
myFakeService.multiplication(2, 2);

let resultBuilder = resultBuilderFactory();

resultBuilder.addFakeService(myFakeService);
const result = resultBuilder.getResult();
```

Because ```subtraction``` was not called the result looks like this:

```JSON
{
    "calculator.add": [
        [
            1,
            2
        ]
    ],
    "calculator.multiplication": [
        [
            2,
            2
        ]
    ]
}
```

---

## addFakeServices

Add fake services takes an array of fake services and conditionally addes each of their spyied on methods.

```JavaScript
let fakeCalculator = {
    __name: 'calculator',
    add: sinon.spy(),
    subtraction: sinon.spy(),
    multiplication: sinon.spy()
};

let fakeCar = {
    __name: 'car',
    accelerate: sinon.spy(),
    decelerate: sinon.spy(),
    openWindow: function () {},
};

fakeCalculator.add(1, 2);
fakeCalculator.multiplication(2, 2);

fakeCar.accelerate('faster');
fakeCar.decelerate('slower');
fakeCar.openWindow();

resultBuilder.addFakeServices(
    [
        fakeCalculator,
        fakeCar
    ]
);
```

Because the ```subtraction``` method was not called and the ```openWindow``` function is not a spy, the result is the followind:

```JSON
{
    "calculator.add": [
        [
            1,
            2
        ],
    ],
    "calculator.multiplication": [
        [
            2,
            2
        ]
    ],
    "car.accelerate": [
        [
            "faster"
        ]
    ],
    "car.decelerate": [
        [
            "slower"
        ]
    ]
}
```

---

## Starting State

You can initialize the object with some starting state.

```JavaScript
let resultBuilder = resultBuilderFactory({ author: 'RJK' });

resultBUilder.addDatum('some data', 8);

const result = resultBuilder.getResult();
```

The result looks like:

```JSON
{
    "author": "RJK",
    "some data": 8
}
```