#version 330 core
layout (location = 0) in vec2 pos;   // the position variable has attribute position 0
// TODO 4.2 add velocity and timeOfBirth as vertex attributes
layout (location = 1) in vec2 velocity;
layout (location = 2) in float timeOfBirth;

// TODO 4.3 create and use a float uniform for currentTime
// out float CurrentTimeUnifOut;
uniform float currentTimeUnif;
float age;

// TODO 4.6 create out variable to send the age of the particle to the fragment shader

void main()
{
    // TODO 4.3 use the currentTime to control the particle in different stages of its lifetime
    if (timeOfBirth == 0)
    {
        pos = vec2(1000.0,1000.0);
    }
    else if (timeOfBirth > 0)
    {
        age = currentTime - timeOfBirth;
    }

    if (age > 5)
    {
        pos = vec2(1000.0,1000.0);
    }
    else
    {
        pos.x += age*velocity.x;
        pos.y += age*velocity.y;
    }
    
    // CurrentTimeUnifOut = currentTimeUnif;

    // TODO 4.6 send the age of the particle to the fragment shader using the out variable you have created

    // this is the output position and and point size (this time we are rendering points, instad of triangles!)
    gl_Position = vec4(pos, 0.0, 1.0);
    gl_PointSize = 10.0;
}