
// Uniforms
uniform vec3 sphereColor;
uniform vec3 sphereCenter;
uniform float sphereRadius;

uniform vec3 boxColor;
uniform mat4 boxMatrix;
uniform vec3 boxSize;

// Configure ray marcher
void GetRayMarcherConfig(out int maxSteps, out float maxDistance, out float surfaceDistance)
{
    maxSteps = 10;
    maxDistance = 100.0f;
    surfaceDistance = 0.001f;
}

struct Output
{
    // color of the closest figure
    vec3 color;
};

// Default value for o
void InitOutput(out Output o)
{
    o.color = vec3(0.0f);
}

// Signed distance function
float GetDistance(vec3 p, inout Output o)
{
    // Sphere in position "sphereCenter" and size "sphereRadius"
    float dSphere = sdfSphere(transformToLocal(p, sphereCenter), sphereRadius);

    // Box with worldView transform "boxMatrix" and dimensions "boxSize"
    float dBox = sdfBox(transformToLocal(p, boxMatrix), boxSize);

    // TODO 10.1 : Replace min with smin and try different small values of k
    float blendFactor;
    float d = smin(dSphere, dBox, 0.5f, blendFactor);

    // TODO 10.1 : Replace this with a mix, using the blend factor from smin
    o.color = mix(sphereColor, boxColor, blendFactor);//== dSphere ? sphereColor : boxColor;

    return d;
}

// Output function: Just a dot with the normal and view vectors
vec4 GetOutputColor(vec3 p, float distance, Output o)
{
    vec3 normal = calculateNormal(p);
    float dotNV = dot(normalize(-p), normal);
    return vec4(dotNV * o.color, 1.0f);
}
