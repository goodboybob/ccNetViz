precision mediump float;
attribute vec2 position;
attribute vec2 normal;
attribute vec2 lengthSoFar;
attribute vec2 startPos;
attribute vec2 endPos;
uniform float time;
uniform float exc;
uniform vec2 size;
uniform vec2 screen;
uniform float aspect2;
uniform float aspect;
uniform float width;
uniform float animateMaxWidth;
uniform mat4 transform;
varying float v_time;
varying vec2 v_startPos;
varying vec2 v_endPos;
varying vec2 v_screen;
varying vec2 n;
varying vec2 v_lengthSoFar;
varying float v_lineWidth;
varying float v_animateMaxWidth;
varying vec2 v_size;