# withLatestFrom Unit Test mocking issue

I created this project to demonstrate what I percieve as unexpected behaviour from the `RxJs` pipe operator, `withLatestFrom`, when its results are mocked within a test.

To prove this, I've created to NgRx effects that do the same job; one using `withLatestFrom` and one using `switchMap` (see file: [dummy-state.effects.spec.ts](https://github.com/tomwhite007/withLastestFrom-mocking-issue/blob/master/src/app/%2Bstate/dummy-state.effects.ts)). I have then created two identical unit tests that mock the method that returns the observable within them (see file: [dummy-state.effects.ts](https://github.com/tomwhite007/withLastestFrom-mocking-issue/blob/master/src/app/%2Bstate/dummy-state.effects.spec.ts)).

## History

I first noticed this when trying to create a demo using RxJs Marbles Testing library. I couldn't understand why my production effects could use Marbles and mocking inside each test, but my demo project could only be mocked on initialisation (rather than inside each test). After removing everything piece by piece, I found that the only difference in my Marbles test cases was that my demo NgRx effects were using `withLatestFrom`.

I found that `withLatestFrom` mocking _on initialisation_ inside the `beforeEach()` works fine. But this is really considered bad practice because it separates the test case mocked values from the unit test

## Getting started

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

Use `npm install` to get dependencies.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
