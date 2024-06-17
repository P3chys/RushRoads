const fragmentShader = `
              

uniform sampler2D iChannel0;

varying vec2 vUv;


void main() {

    //coords
    vec2 uv = vUv;

    //texture - experiment
    float d = texture2D(iChannel0, uv * 0.25).y * 2.0 - 1.0;

    //amount of black based on x
    float v = uv.x + d * 0.1;
    v = 1.0 - abs(v * 2.0 - 1.0);

    //init vector
    vec3 color = vec3(0.0);
    
    //calculate blue - blue regarding x
    float z = (1.5 - uv.x * 0.75);

    //calculate green - green regarding y
    float y = 1.0 - abs(uv.y * 1.0 - 1.0);

    //sets final color
    color += vec3(0, y, z) * v;

    gl_FragColor.rgb = color;
    gl_FragColor.a = 1.0;
}
`

export default fragmentShader;