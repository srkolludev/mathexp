/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = seedDatabaseIfNeeded;

var _user = require('../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _setting = require('../api/setting/setting.model');

var _setting2 = _interopRequireDefault(_setting);

var _category = require('../api/category/category.model');

var _category2 = _interopRequireDefault(_category);

var _rating = require('../api/rating/rating.model');

var _rating2 = _interopRequireDefault(_rating);

var _question = require('../api/question/question.model');

var _question2 = _interopRequireDefault(_question);

var _environment = require('./environment/');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}
function seedDatabaseIfNeeded() {
    if (_environment2.default.seedDB == true) {
        console.log('into seed');
        _user2.default.find({}).remove().then(function () {
            _user2.default.create({
                "_id": "5a16b9c74c1bb8d4086e5a91",
                "name": "sandeep",
                "email": "san@gmail.com",
                "password": "123456",
                "phone": 7376421282,
                "imageUrl": "https://res.cloudinary.com/pietechsolutions/image/upload/v1503489410/pp4qrrywkiomeb8emzdv.jpg",
                "publicId": "pp4qrrywkiomeb8emzdv",
                "role": "user"
            }, {
                "_id": "59ccf50d3a2b240012c27e93",
                "email": "info@ionicfirebaseapp.com",
                "password": "123456",
                "role": "user",
                "name": "Ionic firebase",
                "phone": 9988776655,
                "imageUrl": "https://res.cloudinary.com/pietechsolutions/image/upload/v1507012122/rflufifvhzc3ixwkznuy.jpg",
                "publicId": "rflufifvhzc3ixwkznuy"
            }, {
                "_id": "59cf367625cbcd0012f27c4d",
                "name": "ujjwal",
                "email": "ujjwal.2518@gmail.com",
                "password": "123456",
                "role": "user",
                "imageUrl": "https://res.cloudinary.com/pietechsolutions/image/upload/v1507007787/jisnpaymxwxxgjnwqlfx.jpg",
                "publicId": "jisnpaymxwxxgjnwqlfx"
            }, {
                "_id": "59ccf50d3a2b240012c27e09",
                "name": "admin",
                "email": "ionicfirebaseapp@gmail.com",
                "password": "123456",
                "role": "admin"
            }, {
                "_id": "59d31f593945cc0012a2f1b2",
                "name": "Sandeep ",
                "email": "san10694@gmail.com",
                "phone": 9988776655,
                "password": "123456",
                "role": "user",
                "imageUrl": "https://res.cloudinary.com/pietechsolutions/image/upload/v1507011557/zwh8ns1tnpkurboeazhk.jpg",
                "publicId": "zwh8ns1tnpkurboeazhk"
            }).then(function () {
                console.log('finished populating users');
            });
        });
        _question2.default.find({}).remove().then(function () {
            _question2.default.create({
                "_id": "5b4a237165563c0001caba4f",
                "updatedAt": "2018-07-14T16:23:13.243Z",
                "createdAt": "2018-07-14T16:23:13.243Z",
                "desc": [{
                    "p": "A man sitting in a train which is travelling at [a] kmph observes that a goods train , travelling in opposite direction , takes [p] seconds to pass him. If the goods train is [y]m long ,find its speed."
                }],
                "et": {
                    "int": 5
                },
                "lvl": ["int"],
                "drng": {
                    "y": {
                        "eqn": "n",
                        "rng": ["280", "280"]
                    },
                    "p": {
                        "eqn": "n",
                        "rng": ["9", "9"]
                    },
                    "a": {
                        "eqn": "n",
                        "rng": ["50", "50"]
                    }
                },
                "typ": 1,
                "eqn": "step1((y/p)*(18/5))*0+step2(step1- a)",
                "steps": [{
                    "eqn": "((y/p)*(18/5)) which is step1 (\"A\" m/s is convert into \"A\" km/hr formula is   (A*(18/5))",
                    "desc": "relative speed is",
                    "num": 1
                }, {
                    "eqn": "(step1-a) which is step2",
                    "desc": "speed of goods train is",
                    "num": 2
                }],
                "sct": 3,
                "exam": ["4"],
                "mu": "5b54b080a31801264c3391fe",
                "cu": "5b54b080a31801264c3391fe",
                "__v": 0,
                "evda": {
                    "step2": "62.00",
                    "a": 50,
                    "step1": "112.00",
                    "p": 9,
                    "y": 280
                },
                "evhi": [{
                    "y": 280,
                    "p": 9,
                    "step1": "112.00",
                    "a": 50,
                    "step2": "62.00"
                }, {
                    "step2": "62.00",
                    "a": 50,
                    "step1": "112.00",
                    "p": 9,
                    "y": 280
                }],
                "ans": "62.00",
                "anhi": ["62.00", "62.00"],
                "mtch": ["92.70", "62.00", "12.10", "12.50"],
                "mthi": [["42.20", "2.80", "12.20", "62.00"], ["92.70", "62.00", "12.10", "12.50"]]
            }, {
                "_id": "5b4e0f4265563c0001caba55",
                "updatedAt": "2018-07-17T15:46:10.493Z",
                "createdAt": "2018-07-17T15:46:10.493Z",
                "desc": [{
                    "p": "[a] people are planing to share equally the cost of a rental car.If [b] person withdraws from the arrangement and the others share equally the entire cost of the car, then the share of each of the remaining persons increased by:"
                }],
                "et": {
                    "int": 5
                },
                "lvl": ["int"],
                "drng": {
                    "a": {
                        "rng": ["8", "8"],
                        "eqn": "n"
                    },
                    "b": {
                        "rng": ["1", "1"],
                        "eqn": "n"
                    }
                },
                "typ": 1,
                "eqn": "step1((1/(a-b))-(1/a))*0+step2(step1*a)",
                "steps": [{
                    "num": 1,
                    "desc": "original share of one person is",
                    "eqn": "(1/a)"
                }, {
                    "num": 2,
                    "desc": "New share of the one person is",
                    "eqn": "(1/(a-b))"
                }, {
                    "num": 3,
                    "desc": "Increase share is",
                    "eqn": "((1/(a-b))-(1/a)) which is step1"
                }, {
                    "num": 4,
                    "desc": "the share of each of the remaining persons increased by ",
                    "eqn": "(step1*a) which is step2"
                }],
                "sct": 3,
                "exam": ["4"],
                "mu": "5b54b080a31801264c3391fe",
                "cu": "5b54b080a31801264c3391fe",
                "__v": 0,
                "evda": {
                    "step2": "0.08",
                    "step1": "0.01",
                    "b": 1,
                    "a": 8
                },
                "evhi": [{
                    "step2": "0.08",
                    "step1": "0.01",
                    "b": 1,
                    "a": 8
                }, {
                    "a": 8,
                    "b": 1,
                    "step1": "0.01",
                    "step2": "0.08"
                }, {
                    "step2": "0.08",
                    "step1": "0.01",
                    "b": 1,
                    "a": 8
                }],
                "ans": "0.08",
                "anhi": ["0.08", "0.08", "0.08"],
                "mtch": ["3.98", "7.08", "0.08", "9.28"],
                "mthi": [["3.78", "0.08", "1.88", "2.98"], ["0.08", "3.98", "5.48", "4.18"], ["3.98", "7.08", "0.08", "9.28"]]
            }, {
                "_id": "5b4f5aa165563c0001caba57",
                "updatedAt": "2018-07-18T15:20:01.077Z",
                "createdAt": "2018-07-18T15:20:01.077Z",
                "desc": [{
                    "p": "In a certain shop, [a] oranges cost as much as [b] apples,[b] apples cost as much as [c] mangoes and [d] mangoes cost as much as [e] lemons. if [f] lemons cost Rs. [p], the price of an orange is:"
                }],
                "et": {
                    "int": 5
                },
                "lvl": ["int"],
                "drng": {
                    "a": {
                        "rng": ["9", "9"],
                        "eqn": "n"
                    },
                    "b": {
                        "rng": ["5", "5"],
                        "eqn": "n"
                    },
                    "c": {
                        "rng": ["3", "3"],
                        "eqn": "n"
                    },
                    "d": {
                        "rng": ["4", "4"],
                        "eqn": "n"
                    },
                    "e": {
                        "rng": ["9", "9"],
                        "eqn": "n"
                    },
                    "f": {
                        "rng": ["3", "3"],
                        "eqn": "n"
                    },
                    "p": {
                        "rng": ["4.80", "4.80"],
                        "eqn": "n"
                    }
                },
                "typ": 1,
                "eqn": "step1((p/f)*e)*0+step2(step1/d)*0+step3(step2*c)*0+step4(step3/a)",
                "steps": [{
                    "num": 1,
                    "desc": "cost of [f] lemones is [p]",
                    "eqn": "(p/f)"
                }, {
                    "num": 2,
                    "desc": "cost of [d] mangoes= cost of [e] lemons ,then",
                    "eqn": "((p/f)*e) which is step1"
                }, {
                    "num": 3,
                    "desc": "cost of one mango is",
                    "eqn": "(step1/d) which is step2"
                }, {
                    "num": 4,
                    "desc": "cost of [b] apples = cost of [c] mangoes,then",
                    "eqn": "(step2*c) which is step3"
                }, {
                    "num": 5,
                    "desc": "cost of [a] oranges = cost of [b] apples = step3",
                    "eqn": ""
                }, {
                    "num": 6,
                    "desc": "cost of one orange is",
                    "eqn": "(step3/a) which is step4"
                }],
                "sct": 3,
                "exam": ["4"],
                "mu": "5b54b080a31801264c3391fe",
                "cu": "5b54b080a31801264c3391fe",
                "__v": 0,
                "evda": {
                    "step4": "1.20",
                    "a": 9,
                    "step3": "10.80",
                    "c": 3,
                    "step2": "3.60",
                    "d": 4,
                    "step1": "14.40",
                    "e": 9,
                    "f": 3,
                    "p": 4.8
                },
                "evhi": [{
                    "step4": "1.20",
                    "a": 9,
                    "step3": "10.80",
                    "c": 3,
                    "step2": "3.60",
                    "d": 4,
                    "step1": "14.40",
                    "e": 9,
                    "f": 3,
                    "p": 4.8
                }],
                "ans": "1.20",
                "anhi": ["1.20"],
                "mtch": ["1.20", "7.10", "2.80", "9.20"],
                "mthi": [["1.20", "7.10", "2.80", "9.20"]]
            }).then(function () {
                console.log('finished populating sample questions');
            });
        });
        Category.find({}).remove().then(function () {
            Category.create({
                "_id": "59b92942a187de0012620f7d",
                "title": "Salads",
                "description": "Start the meal off right with these delicious appetizer recipes for dips, finger foods and other tasty bites your guests can nibble on.",
                "thumb": "http://res.cloudinary.com/ddboxana4/image/upload/v1505306944/m4gzofb4b7ojzrean6u0.jpg",
                "createdAt": "2017-09-13T12:49:06.220Z",
                "__v": 0
            }, {
                "_id": "59b9296da187de0012620f7e",
                "title": "Sides",
                "description": "Souvlaki features the fresh-tasting combination of lemon juice, garlic, and olive oil that is so prevalent in Greek cuisine",
                "thumb": "http://res.cloudinary.com/ddboxana4/image/upload/v1505306988/isxrjlbqu1hfhrecquoy.jpg",
                "createdAt": "2017-09-13T12:49:49.326Z",
                "__v": 0
            }, {
                "_id": "59b9298ea187de0012620f7f",
                "title": "Desserts",
                "description": "Serving authentic Italian Chicken Masala made by a 100% Italian from Chicago to Denver's front range. Vegan and Gluten free options available",
                "thumb": "http://res.cloudinary.com/ddboxana4/image/upload/v1505307020/tqhtelxgxysh9vgd8ug4.jpg",
                "createdAt": "2017-09-13T12:50:22.159Z",
                "__v": 0
            }, {
                "_id": "59b929c3a187de0012620f80",
                "title": "Main Course",
                "description": "Start the meal off right with these delicious appetizer recipes for dips, finger foods and other tasty bites your guests can nibble on.",
                "thumb": "http://res.cloudinary.com/ddboxana4/image/upload/v1505307075/ovfdhngzqdfi0fixexvo.jpg",
                "createdAt": "2017-09-13T12:51:15.848Z",
                "__v": 0
            }, {
                "_id": "59b92a07a187de0012620f81",
                "title": "Starters",
                "description": "Souvlaki features the fresh-tasting combination of lemon juice, garlic, and olive oil that is so prevalent in Greek cuisine",
                "thumb": "http://res.cloudinary.com/ddboxana4/image/upload/v1505307140/ylm95agrqulifyaeieew.jpg",
                "createdAt": "2017-09-13T12:52:23.224Z",
                "__v": 0
            }, {
                "_id": "59b92a39a187de0012620f82",
                "title": "Slice",
                "description": "Start the meal off right with these delicious appetizer recipes for dips, finger foods and other tasty bites your guests can nibble on.",
                "thumb": "http://res.cloudinary.com/ddboxana4/image/upload/v1505307192/dkbqgjbjt9l4zxr2whw5.jpg",
                "createdAt": "2017-09-13T12:53:13.413Z",
                "__v": 0
            }).then(function () {
                console.log('finished populating Category');
            });
        });
        _rating2.default.find({}).remove().then(function () {
            _rating2.default.create({
                "_id": "5a098f51e82afd00124e2a7f",
                "user": "5a16b9c74c1bb8d4086e5a91",
                "comment": "Product is good and healthy food....",
                "order": "5a098ebae82afd00124e2a7b",
                "menuItem": "59b92be6a187de0012620f8c",
                "createdAt": "2017-11-13T12:25:53.335Z",
                "rating": 5,
                "__v": 0
            }, {
                "_id": "5a098f85e82afd00124e2a80",
                "user": "5a16b9c74c1bb8d4086e5a91",
                "comment": "Nice food, happy to happy for..",
                "order": "5a098ebae82afd00124e2a7b",
                "menuItem": "59b92b6aa187de0012620f89",
                "createdAt": "2017-11-13T12:26:45.901Z",
                "rating": 4,
                "__v": 0
            }, {
                "_id": "5a09906be82afd00124e2a84",
                "user": "5a16b9c74c1bb8d4086e5a91",
                "comment": "nice food for non-vegi...",
                "order": "5a09902be82afd00124e2a81",
                "menuItem": "59b92c21a187de0012620f8d",
                "createdAt": "2017-11-13T12:30:35.934Z",
                "rating": 3,
                "__v": 0
            }).then(function () {
                console.log('finished populating Rating');
            });
        });
    }
}
//# sourceMappingURL=seed.js.map
