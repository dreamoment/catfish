<h1 align="center">catfish</h1>

![](/docs/preview.gif)

Language: English | [中文简体](README_zh_cn.md)

## What is catfish ?

`threejs` garbage collector, free memory.

> Any instance reference, such as `browser extension`, `js console`, will cause memory free failure.

## Features

- lightweight and easy to use

- deep cleaning

- support`typescript`

## Install

```agsl
npm i @dreamoment/catfish
```

## Examples

```
import Catfish from '@dreamoment/catfish'

// Do not have redundant references to instances, or you will not be able to clean up successfully.
// console.log(object3D)

Catfish.dispose(object3D)

// If the variable is global, you must explicitly set the variable to null
object3D = null

// If you want to completely destroy the 3D application
// Catfish.exit(renderer)
```

## API

### `static` dispose

Free `threejs` instance memory.

```
Catfish.dispose(object: THREE.Object3D | THREE.BufferGeometry | THREE.Material | THREE.Texture): void
```

### `static` exit

Destroy the `threejs` application. You should always call `dispose` before calling `exit`.

```
Catfish.exit(renderer: THREE.WebGLRenderer): void
```