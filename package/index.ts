import * as THREE from 'three'


class Catfish {

    static dispose(object: THREE.Object3D | THREE.BufferGeometry | THREE.Material | THREE.Texture) {

        const _dispose = (object: THREE.BufferGeometry | THREE.Material | THREE.Texture) => {
            object.dispose()
        }

        const traverseMaterialsTextures = (material: THREE.Material | THREE.Material[]) => {
            const traverseMaterial = (mat: THREE.Material) => {

                // material
                _dispose(mat)

                // texture
                Object.values(mat)
                    .filter((value) => value instanceof THREE.Texture)
                    .forEach((texture) => _dispose(texture))

                // uniform texture
                if((mat as THREE.ShaderMaterial).uniforms) {
                    Object.values((mat as THREE.ShaderMaterial).uniforms)
                        .filter(({ value }) => value instanceof THREE.Texture)
                        .forEach(({ value }) => _dispose(value))
                }
            }

            if (Array.isArray(material)) {
                material.forEach((mat) => traverseMaterial(mat))
            }
            else {
                traverseMaterial(material)
            }
        }
        
        const disposeObject = (object: any) => {
            // geometry
            if (object.geometry) {
                _dispose(object.geometry)
            }
            if (object.material) {
                traverseMaterialsTextures(object.material)
            }
        }

        if (object instanceof THREE.BufferGeometry || object instanceof THREE.Texture) {
            return _dispose(object)
        }


        if (object instanceof THREE.Material) {
            return traverseMaterialsTextures(object)
        }

        disposeObject(object)

        if (object.traverse) {
            object.traverse((object) => disposeObject(object))
        }

        if (object instanceof THREE.Object3D) {
            object.removeFromParent()
        }
    }

    static exit(renderer: THREE.WebGLRenderer) {
        renderer.dispose()
        renderer.domElement.remove()
    }
}


export default Catfish