<h1 align="center">catfish</h1>

![](/docs/preview.gif)

语言: [English](README.md) | 中文简体

## catfish 是什么 ?

`threejs`垃圾回收器，释放内存。

> 任何实例引用，都会导致释放内存失败，例如：浏览器插件、console。

## 特性

- 轻量易用

- 深度清理

- 支持`typescript`

## 安装

```agsl
npm i @dreamoment/catfish
```

## 示例

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

释放`threejs`实例内存。

```
Catfish.dispose(object: THREE.Object3D | THREE.BufferGeometry | THREE.Material | THREE.Texture): void
```

### `static` exit

销毁`threejs`应用。在调用`exit`之前，应该始终先调用`dispose`。

```
Catfish.exit(renderer: THREE.WebGLRenderer): void
```