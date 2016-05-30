/*!
 * pace-calculator.js
 * ------------------
 * Copyright (c) 2014 Teun Zengerink
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
(function (window, document) {
    'use strict';

    // Element
    // -------

    function Element (elementId) {
        this.elementId = elementId;
    }

    Element.prototype.addClass = function (className) {
        this.getElement().classList.add(className);
    };

    Element.prototype.getElement = function () {
        return document.getElementById(this.elementId);
    };

    Element.prototype.removeClass = function (className) {
        this.getElement().classList.remove(className);
    };

    Element.prototype.toggleClass = function (className) {
        this.getElement().classList.toggle(className);
    };

    // Button
    // ------

    function Button (elementId, onClick) {
        Element.call(this, elementId);
        this.getElement().onclick = onClick;
    }

    Button.prototype = window.Object.create(Element.prototype);

    // Select
    // ------

    function Select (elementId, length, padding) {
        Element.call(this, elementId);
        this.length = length;
        this.padToLength = padding || false;
        var i, option;
        for (i = 0; i < length; i++) {
            option = document.createElement('option');
            option.value = i;
            option.innerHTML = this.pad(i);
            this.getElement().appendChild(option);
        }
    }

    Select.prototype = window.Object.create(Element.prototype);

    Select.prototype.get = function () {
        return this.getElement().value;
    };

    Select.prototype.pad = function (num) {
        if (this.padToLength) {
            num = num + '';
            return num.length >= this.padToLength ? num : new window.Array(this.padToLength - num.length + 1).join('0') + num;
        }
        return num;
    };

    Select.prototype.set = function (value) {
        var i, options;
        options = this.getElement().options;
        for (i = 0; i < options.length; i++) {
            if (window.parseInt(options[i].value) === value) {
                options[i].selected = true;
                return value;
            }
        }
    };

    // SelectCollection
    // ----------------

    function SelectCollection(elementId, selects) {
        Element.call(this, elementId);
        this.selects = selects;
    }

    SelectCollection.prototype = window.Object.create(Element.prototype);

    SelectCollection.prototype.get = function () {
        var i, value;
        value = [];
        for (i = 0; i < this.selects.length; i++) {
            value.push(this.selects[i].get());
        }
        return value;
    };

    SelectCollection.prototype.set = function (value) {
        var i, list;
        list = [];
        for (i = 0; i < this.selects.length; i++) {
            list.push(this.selects[i].set(value[i]));
        }
        return list;
    };

    // Calculator
    // ----------

    function Calculator (inputDistance, inputPace, inputTime) {
        this.inputDistance = inputDistance;
        this.inputPace = inputPace;
        this.inputTime = inputTime;
    }

    Calculator.prototype.calculateDistance = function () {
        var distance, pace, time;
        pace = this.paceInSecondsPerKilometer();
        time = this.timeInSeconds();
        distance = this.distanceToArray(time / pace);
        this.inputDistance.set(distance);
    };

    Calculator.prototype.calculatePace = function () {
        var distance, pace, time;
        distance = this.distanceInKilometers();
        time = this.timeInSeconds();
        pace = this.paceToArray(time / distance);
        this.inputPace.set(pace);
    };

    Calculator.prototype.calculateTime = function () {
        var distance, pace, time;
        distance = this.distanceInKilometers();
        pace = this.paceInSecondsPerKilometer();
        time = this.timeToArray(distance * pace);
        this.inputTime.set(time);
    };

    Calculator.prototype.distanceInKilometers = function () {
        var distance = this.inputDistance.get();
        return this.int(distance[0]) + (this.float(distance[1], 2) / 100);
    };

    Calculator.prototype.distanceToArray = function (distance) {
        distance = this.float(distance, 2);
        return [this.int(distance), this.float(distance % 1, 2) * 100];
    };

    Calculator.prototype.float = function (num, len) {
        return window.parseFloat(num).toFixed(len);
    };

    Calculator.prototype.int = function (num) {
        return window.parseInt(num);
    };

    Calculator.prototype.paceInSecondsPerKilometer = function () {
        var pace = this.inputPace.get();
        return this.int(pace[0] * 60) + this.int(pace[1]);
    };

    Calculator.prototype.paceToArray = function (pace) {
        pace = pace / 60;
        return [this.int(pace), this.int((pace % 1) * 60)];
    };

    Calculator.prototype.round = function (num) {
        return window.Math.round(num);
    };

    Calculator.prototype.timeInSeconds = function () {
        var time = this.inputTime.get();
        return this.int(time[0] * 3600) + this.int(time[1] * 60) + this.int(time[2]);
    };

    Calculator.prototype.timeToArray = function (time) {
        return [
            this.int(time / 3600) % 24,
            this.int(time / 60) % 60,
            this.round(time % 60)
        ];
    };

    // PaceCalculator
    // --------------

    function PaceCalculator (elementId, calculator, buttons) {
        Element.call(this, elementId);
        this.calculator = calculator;
        this.buttons = buttons;
    }

    PaceCalculator.prototype = window.Object.create(Element.prototype);

    // PaceCalculatorFactory
    // ---------------------

    function PaceCalculatorFactory () {}

    PaceCalculatorFactory.prototype.build = function () {
        var btnDistance, btnPace, btnTime, calculator, inputDistance, inputPace, inputTime;

        inputDistance = new SelectCollection('distance', [
            new Select('distance-km', 100),
            new Select('distance-dm', 100, 2)
        ]);

        inputPace = new SelectCollection('pace', [
            new Select('pace-mm', 60),
            new Select('pace-ss', 60, 2)
        ]);

        inputTime = new SelectCollection('time', [
            new Select('time-hh', 10),
            new Select('time-mm', 60, 2),
            new Select('time-ss', 60, 2)
        ]);

        calculator = new Calculator(inputDistance, inputPace, inputTime);

        btnDistance = new Button('calculate-distance', function () {
            calculator.calculateDistance();
            inputDistance.addClass('highlight');
            inputPace.removeClass('highlight');
            inputTime.removeClass('highlight');
        });

        btnPace = new Button('calculate-pace', function () {
            calculator.calculatePace();
            inputDistance.removeClass('highlight');
            inputPace.addClass('highlight');
            inputTime.removeClass('highlight');
        });

        btnTime = new Button('calculate-time', function () {
            calculator.calculateTime();
            inputDistance.removeClass('highlight');
            inputPace.removeClass('highlight');
            inputTime.addClass('highlight');
        });

        return new PaceCalculator('pace-calculator', calculator, [btnDistance, btnPace, btnTime]);
    };

    // Initialization
    // --------------

    window.paceCalculator = (new PaceCalculatorFactory()).build();
})(window, document);
