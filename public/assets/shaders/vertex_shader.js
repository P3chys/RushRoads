const vertex_shader =`
    
    varying vec2 vUv;
                    
    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vUv = uv;
        }
`

export default vertex_shader;