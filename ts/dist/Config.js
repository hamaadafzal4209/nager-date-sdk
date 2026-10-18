"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Holidays',
        slug: "holidays",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
    };
    options = {
        base: "https://date.nager.at",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            available_country: {},
            public_holiday: {},
        }
    };
    entity = {
        "available_country": {
            "fields": [
                {
                    "name": "countryCode",
                    "title": "Country Code",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                }
            ],
            "name": "available_country",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v3/AvailableCountries",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v3"
                                },
                                {
                                    "lit": "AvailableCountries"
                                }
                            ],
                            "parts": [
                                "api",
                                "v3",
                                "AvailableCountries"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "public_holiday": {
            "fields": [
                {
                    "name": "countryCode",
                    "title": "Country Code",
                    "type": "`$STRING`"
                },
                {
                    "name": "date",
                    "title": "Date",
                    "type": "`$STRING`",
                    "format": "date"
                },
                {
                    "name": "global",
                    "title": "Global",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "localName",
                    "title": "Local Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                }
            ],
            "name": "public_holiday",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v3/PublicHolidays/{year}/{countryCode}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v3"
                                },
                                {
                                    "lit": "PublicHolidays"
                                },
                                {
                                    "var": "year"
                                },
                                {
                                    "var": "country_code"
                                }
                            ],
                            "parts": [
                                "api",
                                "v3",
                                "PublicHolidays",
                                "{year}",
                                "{country_code}"
                            ],
                            "rename": {
                                "param": {
                                    "countryCode": "country_code"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "country_code",
                                        "orig": "countryCode",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "year",
                                        "orig": "year",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "country_code",
                                    "year"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map