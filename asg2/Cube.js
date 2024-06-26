class Cube {
    constructor() {
        this.type = 'cube';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
    }

    render() {
        var rgba = this.color;

        // Pass the position of a point to a_Position variable
        // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);



        // Draw

        // Front of cube
        drawTriangle3D([0, 0, 0, 1, 1, 0, 1, 0, 0]);
        drawTriangle3D([0, 0, 0, 0, 1, 0, 1, 1, 0]);

        gl.uniform4f(u_FragColor, rgba[0] * .9, rgba[1] * .9, rgba[2] * .9, rgba[3]);
        // Top of cube
        drawTriangle3D([0, 1, 0, 0, 1, 1, 1, 1, 1]);
        drawTriangle3D([0, 1, 0, 1, 1, 1, 1, 1, 0])
        // Right side of cube
        drawTriangle3D([1, 0, 0, 1, 1, 0, 1, 1, 1]);
        drawTriangle3D([1, 0, 0, 1, 1, 1, 1, 0, 1]);
        gl.uniform4f(u_FragColor, rgba[0] * .8, rgba[1] * .8, rgba[2] * .8, rgba[3]);
        // Left side of cube
        drawTriangle3D([0, 0, 0, 0, 0, 1, 0, 1, 1]);
        drawTriangle3D([0, 0, 0, 0, 1, 1, 0, 1, 0]);
        // Bottom side of cube
        drawTriangle3D([0, 0, 0, 1, 0, 0, 1, 0, 1]);
        drawTriangle3D([0, 0, 0, 1, 0, 1, 0, 0, 1]);

        // Back side of cube
        drawTriangle3D([0, 0, 1, 1, 0, 1, 1, 1, 1]);
        drawTriangle3D([0, 0, 1, 1, 1, 1, 0, 1, 1]);


    }
}
