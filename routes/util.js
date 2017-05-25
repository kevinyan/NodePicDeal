module.exports = {
    countInArray: function (array, value, key) {
        var count = 0;
        this.each(array, function () {
            if (this[key] === value) {
                count++;
            }
        });
        return count;
    },
    decodeDate: function (str) {
        str = str.match(/\d+/g) || [];
        return new Date(
            parseInt(str[0] || 0),
            parseInt(str[1] || 0) - 1,
            parseInt(str[2] || 0),
            parseInt(str[3] || 0),
            parseInt(str[4] || 0),
            parseInt(str[5] || 0)
        );
    },
    each: function (obj, callback, args) {
        var name,
            i = 0,
            length = obj.length,
            isObj = length === undefined || this.isFunction(obj);
        if (args) {
            if (isObj) {
                for (name in obj) {
                    if (callback.apply(obj[name], args) === false) {
                        break;
                    }
                }
            } else {
                for (; i < length;) {
                    if (callback.apply(obj[i++], args) === false) {
                        break;
                    }
                }
            }
        } else {
            if (isObj) {
                for (name in obj) {
                    if (callback.call(obj[name], name, obj[name]) === false) {
                        break;
                    }
                }
            } else {
                for (; i < length;) {
                    if (callback.call(obj[i], i, obj[i++]) === false) {
                        break;
                    }
                }
            }
        }
        return obj;
    },
    format: function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /**
     * 对象扩展，这部分沿用了jquery的递归方法。
     * @returns {*|{}}
     */
    extend: function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== 'object' && !this.type(target) === 'function') {
            target = {};
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && this.isArray(src) ? src : [];
                        } else {
                            clone = src && this.isPlainObject(src) ? src : {};
                        }
                        target[name] = this.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    },
    getCurrentWeek: function (startDate) {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var day = date.getDay();
        if (!startDate) {
            day -= 1;
            startDate = new Date(date.getTime() - day * 24 * 60 * 60 * 1000);
        }
        day -= 4;
        var endDate = new Date(date.getTime() - day * 24 * 60 * 60 * 1000);
        return {startDate: startDate, endDate: endDate};
    },
    getCurrentDay: function (startDate) {
        startDate = startDate || new Date();
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        var endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
        return {startDate: startDate, endDate: endDate};
    },
    getQueryString: function (data) {
        var res = [];
        for (var item in data) {
            if (!data.hasOwnProperty(item)) {
                continue;
            }
            if (data[item] !== null && data[item] !== undefined) {
                res.push(item + "=" + data[item]);
            }
        }
        return res.join('&');
    },
    isArray: Array.isArray || function (obj) {
        return this.type(obj) === 'array';
    },
    isFunction: function (obj) {
        return this.type(obj) === "function";
    },
    isInArray: function (obj, value, key) {
        if (typeof key === 'undefined') {
            return obj.indexOf(value);
        }
        var ret = false;
        this.each(obj, function () {
            if (this[key] === value) {
                ret = true;
                return false;
            }
        });
        return ret;
    },
    isPlainObject: function (obj) {
        if (!obj || jQuery.type(obj) !== 'object' || obj.nodeType || (obj != null && obj == obj.window)) {
            return false;
        }
        try {
            if (obj.constructor && !Object.prototype.hasOwnProperty.call(obj, 'constructor') && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
                return false;
            }
        } catch (e) {
            return false;
        }
        var key;
        for (key in obj) {
        }
        return key === undefined || Object.prototype.hasOwnProperty.call(obj, key);
    },
    log: function () {
        console.log.call(console, '[' + this.format(new Date(), 'yyyy-MM-dd hh:mm:ss') + '] ', arguments);
    },
    param: function (obj) {
        var arr = [];
        for (var i in obj) {
            var proper = obj[i];
            if (typeof proper !== 'undefined') {
                arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(proper));
            }
        }
        return arr.join('&');
    },
    sort: function (sortList, dataList, key) {
        var list = [];
        var _this = this;
        this.each(sortList, function (index, value) {
            var item = _this.valueInArray(dataList, value, key);
            if (item) {
                list.push(item.value);
            }
        });
        return list;
    },
    /**
     * 判断变量类型
     * @param obj 变量
     * @returns {*|string}
     */
    type: function (obj) {
        var class2type = ['boolean', 'number', 'string', 'function', 'array', 'date', 'regexp', 'object'];
        return obj == null ?
            String(obj) :
        class2type[Object.prototype.toString.call(obj)] || 'object';
    },
    valueInArray: function (array, value, key) {
        var ret = null;
        var _this = this;
        this.each(array, function (index) {
            var item = this;
            if (_this.isArray(value)) {
                var flag = 0;
                _this.each(value, function (i, val) {
                    if (item[key[i]] === val) {
                        flag++;
                    }
                });
                if (flag === value.length) {
                    ret = {key: index, value: this};
                    return false;
                }
            } else if (this[key] === value) {
                ret = {key: index, value: this};
                return false;
            }
        });
        return ret;
    },
    encodeBase64: function(str) {
        return new Buffer(str).toString('base64');
    },
    decodeBase64: function(str) {
        return new Buffer(str, 'base64').toString();
    }
};
