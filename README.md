# chainemall
> Chain 'em all!

## :warning: Not meant to be used in production

## Install

`npm i chainemall`

## Usage
~~~ js
const chainemall = require('chainemall')

// before
console.group('warning')
  console.warn('Attention!')
  console.log('Its nothing')
console.groupEnd('warning')

// after
chainemall(console)
  .group('warning')
    .warn('Attention!')
    .log('Its nothing')
  .groupEnd('warning')


const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')

// before
context.beginPath()
context.moveTo(20, 20)
context.lineTo(200, 20)
context.stroke()

// after
chainemall(context)
  .beginPath()
  .moveTo(20, 20)
  .lineTo(200, 20)
  .stroke()

// You can pass returned values to the next method in the chain
const chain = chainemall({
  double: n => n * 2,
  log: x => console.log(x)
})

chain.double(2).log()
~~~

## Why?
Because it's cool!

## License
MIT
